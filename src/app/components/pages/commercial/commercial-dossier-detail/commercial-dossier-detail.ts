import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommercialService } from '../../../../services/commercial.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commercial-dossier-detail.html',
  styleUrls: ['./commercial-dossier-detail.css']
})
  
  
export class CommercialDossierDetail {

  dossier: any;
  vehicule: any;
  services: any[] = [];
  documents: any[] = [];

  loading = true;

  statuts: string[] = ['en_attente', 'en_etude', 'accepte', 'refuse'];
  selectedStatut: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: CommercialService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getDossierById(id).subscribe({
      next: (res) => {
        this.dossier = res.dossier;
        this.vehicule = res.vehicule;
        this.services = res.services;
        this.documents = res.documents;

        this.selectedStatut = this.dossier?.statut; // important

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  changerStatut(nouveauStatut: string) {
    const id = this.dossier?.id;
    if (!id) return;

    this.service.updateStatutDossier(id, nouveauStatut).subscribe({
      next: (res) => {
        this.dossier.statut = res.statut;
      }
    });
  }

  message: string = '';

  validerStatut() {
    const id = this.dossier?.id;

    if (!id || !this.selectedStatut) return;

    this.service.updateStatutDossier(id, this.selectedStatut).subscribe({
      next: (res) => {
        this.dossier.statut = res.statut;

        // message de confirmation
        this.message = "Statut mis à jour avec succès ✅";

        // disparition automatique après 3s
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: () => {
        this.message = "Erreur lors de la mise à jour ❌";

        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    });
  }





}

