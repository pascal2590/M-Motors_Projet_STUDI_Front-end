import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-dossiers',
  templateUrl: './client-dossiers.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './client-dossiers.css'
})
export class ClientDossiersComponent implements OnInit {

  dossiers: any[] = [];

  constructor(
    private service: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('CLIENT-DOSSIERS INIT');

    this.service.getDossiers().subscribe({
      next: (data) => {

        this.dossiers = data.map(d => {

          // calcul des documents remplis
          const totalDocs = d.documents?.length || 4;

          const docsRemplis = d.documents
            ? d.documents.filter((doc: any) => doc.cheminFichier).length
            : 0;

          const progression = Math.round((docsRemplis / totalDocs) * 100);

          return {
            ...d,
            progression
          };
        });

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openDossier(id: number) {
    this.router.navigate(['/espace-client/dossiers', id]);
  }
}
