import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  vehiculeId!: number;
  vehicule: any;

  apiVehiculesUrl = 'http://localhost:5119/api/vehicule';

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

  hasSubmitted = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dossierService: DossierService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.vehiculeId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadVehicule();
    this.loadUserFromToken();
  }

  // =====================================================
  // VEHICULE
  // =====================================================
  loadVehicule() {

    this.http.get<any>(
      `${this.apiVehiculesUrl}/${this.vehiculeId}`
    ).subscribe({
      next: data => this.vehicule = data,
      error: err => {
        console.error(err);
        this.errorMessage = "Impossible de charger le véhicule";
      }
    });
  }

  // =====================================================
  // USER JWT
  // =====================================================
  loadUserFromToken() {

    const token = this.authService.getToken();

    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      this.form.nom = payload.nom ?? '';
      this.form.prenom = payload.prenom ?? '';
      this.form.email = payload.email ?? '';

    } catch (err) {
      console.error('Token invalide', err);
    }
  }

  // =====================================================
  // ENVOI DOSSIER LLD
  // =====================================================
  envoyerDossier() {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.isLoading) return;

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

    this.isLoading = true;

    this.dossierService.envoyerLLD(payload).subscribe({

      next: (response: any) => {

        console.log('LLD RESPONSE =', response);

        if (response?.success !== true) {

          this.errorMessage = response?.message ?? "Erreur lors de la création";
          this.isLoading = false;
          return;
        }

        this.successMessage = response.message ?? "Dossier LLD créé avec succès";
        this.hasSubmitted = true;
        this.isLoading = false;

        // redirection propre Angular        
        setTimeout(() => {
          this.router.navigate(['/espace-client/dossiers']);
        }, 1200);
      },

      error: (err) => {

        console.error(err);

        this.errorMessage = "Erreur serveur";
        this.isLoading = false;
      }

    });
  }

  // =====================================================
  // CALCUL MENSUALITE
  // =====================================================
  calculMensualite() {

    if (!this.vehicule) return;

    const prix = this.vehicule.prix || 0;
    const duree = this.form.duree || 36;
    const kilometrage = this.form.kilometrage || 10000;

    const base = prix / duree;
    const kmFactor = kilometrage > 15000 ? 1.1 : 1;

    this.form.mensualite = base * kmFactor;
  }
}
