import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-dossier-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-dossier-detail.html',
  styleUrl: './client-dossier-detail.css'
})
export class ClientDossierDetailComponent implements OnInit {

  dossier: any = null;

  loading: boolean = true;

  dossierId!: number;

  progression: number = 0;

  filesMap: { [key: string]: File } = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  // INIT
  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.dossierId = +params['id'];

      if (!this.dossierId)
        return;

      this.loadDossier();

    });

  }

  // LOAD DOSSIER
  loadDossier(): void {

    this.loading = true;

    this.http.get<any>(
      `http://localhost:5119/api/dossiers/${this.dossierId}`
    )
      .subscribe({

        next: (data) => {

          this.dossier = data.dossier;

          this.dossier.vehicule =
            data.vehicule;

          this.dossier.documents =
            data.documents;

          // CALCUL de la PROGRESSION
          this.calculateProgression();

          this.loading = false;

        },

        error: (err) => {

          console.error(
            'Erreur load dossier',
            err
          );

          this.loading = false;

        }

      });

  }

  // CALCUL de la PROGRESSION
  calculateProgression(): void {

    if (!this.dossier?.documents) {

      this.progression = 0;
      return;

    }

    const total =
      this.dossier.documents.length;

    const completes =
      this.dossier.documents.filter(
        (doc: any) =>
          doc.cheminFichier
      ).length;

    if (total === 0) {

      this.progression = 0;

    }
    else {

      this.progression =
        Math.round(
          (completes / total) * 100
        );

    }

    console.log(
      "Progression:",
      this.progression + "%"
    );

  }

  // Sélection du fichier
  onFileSelected(
    event: any,
    type: string
  ): void {

    const file =
      event.target.files?.[0];

    if (!file)
      return;

    this.filesMap[type] = file;

  }

  // UPLOAD du document
  uploadDocument(doc: any): void {

    const type =
      doc.typeDocument;

    const file =
      this.filesMap[type];

    if (!file) {

      console.warn(
        'Fichier manquant pour :',
        type
      );

      return;

    }

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    formData.append(
      'dossierId',
      this.dossierId.toString()
    );

    formData.append(
      'typeDocument',
      type
    );

    this.http.post(
      'http://localhost:5119/api/documents/upload',
      formData
    )
      .subscribe({

        next: () => {

          // Recharge le dossier
          // recalcul de la progression auto

          this.loadDossier();

        },

        error: (err) =>

          console.error(
            'UPLOAD ERROR',
            err
          )

      });

  }

  // LABEL DOCUMENT
  getDocumentLabel(type: string): string {

    switch (type) {

      case 'identite':
        return 'Pièce d’identité';

      case 'domicile':
        return 'Justificatif de domicile';

      case 'revenus':
        return 'Justificatif de revenus';

      case 'rib':
        return 'RIB';

      case 'permis':
        return 'Permis de conduire';

      default:
        return type;

    }

  }

}
