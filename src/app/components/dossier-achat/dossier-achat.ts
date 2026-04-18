import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DossierService } from '../../services/dossier';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dossier-achat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dossier-achat.html',
  styleUrl: './dossier-achat.css'
})
export class DossierAchat implements OnInit {

  // ID véhicule
  vehiculeId!: number;

  // Véhicule
  vehicule: any;

  successMessage = '';
  errorMessage = '';

  hasSubmitted = false;

  // API véhicules
  apiVehiculesUrl = 'http://localhost:5119/api/vehicule';

  // FORMULAIRE ACHAT (UNIQUEMENT champs métier)
  form = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    apport: 0,
    financement: 'credit'
  };  

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
  // USER (JWT ONLY)
  // -----------------------------
  loadUserFromToken() {

    const token = this.authService.getToken();

    if (!token) {
      console.warn('Aucun token trouvé');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    // mapping
    this.form.nom = payload.nom ?? '';
    this.form.prenom = payload.prenom ?? '';
    this.form.email = payload.email ?? '';
  }

  // -----------------------------
  // ENVOI DOSSIER
  // -----------------------------
  envoyerDossier() {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.hasSubmitted) {

      this.errorMessage =
        "Dossier déjà envoyé";

      return;
    }

    if (!this.authService.isLoggedIn()) {

      this.errorMessage =
        "Vous devez être connecté";

      return;
    }

    const clientId =
      this.authService.getUserId();

    if (!clientId) {

      this.errorMessage =
        "Utilisateur invalide";

      return;
    }

    const payload = {

      clientId,
      vehiculeId: this.vehiculeId,

      ...this.form

    };

    this.dossierService
      .envoyerAchat(payload)
      .subscribe({

        next: (response: any) => {

          if (!response.success) {

            this.errorMessage =
              response.message;

            return;
          }

          this.successMessage =
            response.message;

          this.hasSubmitted = true;

          // Redirection
          setTimeout(() => {

            window.location.replace('/vehicules');

          }, 1500);

        },

        error: (err) => {

          console.error(err);

          this.errorMessage =
            "Erreur serveur, veuillez réessayer";

        }

      });

  }


}
