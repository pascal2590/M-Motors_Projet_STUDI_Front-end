import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DossierService } from '../../services/dossier';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dossier-lld',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dossier-lld.html',
  styleUrl: './dossier-lld.css'
})
export class DossierLld implements OnInit {

  // ID véhicule
  vehiculeId!: number;

  // Véhicule
  vehicule: any;

  // API véhicules
  apiVehiculesUrl = 'http://localhost:5119/api/vehicule';

  // FORMULAIRE LLD
  form = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    apport: 0,
    financement: 'lld',
    duree: 36,
    kilometrage: 10000,
    mensualite: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dossierService: DossierService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.vehiculeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadVehicule();
    this.loadUserFromToken();
  }

  // -----------------------------
  // VEHICULE
  // -----------------------------
  loadVehicule() {

    this.http.get<any>(
      `${this.apiVehiculesUrl}/${this.vehiculeId}`
    ).subscribe({
      next: data => this.vehicule = data,
      error: err => console.error(err)
    });

  }

  // -----------------------------
  // USER JWT
  // -----------------------------
  loadUserFromToken() {

    const token = this.authService.getToken();

    if (!token) {
      console.warn('Aucun token trouvé');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    this.form.nom = payload.nom ?? '';
    this.form.prenom = payload.prenom ?? '';
    this.form.email = payload.email ?? '';
  }

  // -----------------------------
  // ENVOI DOSSIER LLD
  // -----------------------------
  hasSubmitted = false;

  envoyerDossier() {

    if (this.hasSubmitted) {
      this.errorMessage = "Dossier déjà envoyé";
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.errorMessage = "Vous devez être connecté";
      return;
    }

    const clientId = this.authService.getUserId();

    if (!clientId) {
      this.errorMessage = "Utilisateur invalide";
      return;
    }

    const payload = {
      clientId,
      vehiculeId: this.vehiculeId,
      ...this.form
    };

    this.dossierService.envoyerLLD(payload).subscribe({
      next: () => {
        this.successMessage = "Dossier envoyé avec succès";
        this.hasSubmitted = true; // 🔒 BLOQUE LES RENVOIS
      },
      error: () => {
        this.errorMessage = "Erreur envoi dossier";
      }
    });
  }


  // CALCUL MENSUALITÉ LLD (simplifié)
  calculMensualite() {

    if (!this.vehicule) return;

    const prix = this.vehicule.prix || 0;

    const duree = this.form.duree || 24;

    const kilometrage = this.form.kilometrage || 10000;

    // formule simple (à adapter métier)
    const base = prix / duree;

    const kmFactor =
      kilometrage > 15000 ? 1.1 : 1;

    this.form.mensualite =
      base * kmFactor;

  }


}
