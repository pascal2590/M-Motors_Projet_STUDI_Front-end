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
  historique: any[] = [];

  loading = true;

  getStatutsDisponibles(): string[] {

    const statut = this.dossier?.statut;

    switch (statut) {

      case 'en_attente':
        return ['en_etude'];

      case 'en_etude':
        return ['accepte', 'refuse'];

      default:
        return [];
    }
  }
  selectedStatut: string = '';

  message: string = '';

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
        this.historique = res.historique;
        this.selectedStatut = this.dossier?.statut;

        const disponibles = this.getStatutsDisponibles();
        this.selectedStatut =
          disponibles.length > 0
            ? disponibles[0]
            : '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  // BLOQUAGE LOGIQUE UI - STATUTS FINAUX
  isFinalStatut(): boolean {
    return this.dossier?.statut === 'accepte' ||
      this.dossier?.statut === 'refuse';
  }

  // UPDATE STATUT - AVEC GESTION DES ERREURS BACKEND
  validerStatut() {

    if (this.isFinalStatut()) {
      this.message = "Ce dossier est déjà finalisé";
      setTimeout(() => this.message = '', 3000);
      return;
    }

    const id = this.dossier?.id;
    if (!id || !this.selectedStatut) return;

    this.service.updateStatutDossier(id, this.selectedStatut).subscribe({
      next: (res) => {
        this.dossier.statut = res.statut;

        // synchro UI obligatoire
        this.selectedStatut = res.statut;

        this.message = "Statut mis à jour avec succès ✅";

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (err) => {
        // affiche message backend (très important maintenant)
        this.message = err?.error?.message || "Erreur lors de la mise à jour ❌";

        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    });
  }

  changerStatut(nouveauStatut: string) {

    if (this.isFinalStatut()) return;

    const id = this.dossier?.id;
    if (!id) return;

    this.service.updateStatutDossier(id, nouveauStatut).subscribe({
      next: (res) => {
        this.dossier.statut = res.statut;
        this.selectedStatut = res.statut;
      }
    });
  }

  getDateStatut(statut: string): string | null {

    const item = this.historique.find(
      x => x.statut === statut
    );

    return item?.date || null;
  }
  
}