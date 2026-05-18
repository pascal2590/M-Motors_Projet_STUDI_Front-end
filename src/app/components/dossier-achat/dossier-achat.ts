import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DossierService } from '../../services/dossier';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

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

  vehiculeId!: number;
  vehicule: any;

  successMessage = '';
  errorMessage = '';

  hasSubmitted = false;
  isLoading = false;

  apiVehiculesUrl = environment.apiUrl + '/vehicule';

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

   // VEHICULE  
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

    // USER FROM TOKEN 
  loadUserFromToken() {

    const token = this.authService.getToken();

    if (!token) {
      console.warn('Aucun token trouvé');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      this.form.nom = payload.nom ?? '';
      this.form.prenom = payload.prenom ?? '';
      this.form.email = payload.email ?? '';

    } catch (err) {
      console.error('Token invalide', err);
    }
  }

    // ENVOI DOSSIER  
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

    this.dossierService.envoyerAchat(payload).subscribe({

      next: (response: any) => {

        console.log('DOSSIER RESPONSE =', response);

        if (response?.success !== true) {
          this.errorMessage = response?.message ?? "Erreur lors de la création";
          this.isLoading = false;
          return;
        }

        this.successMessage = response.message ?? "Dossier créé avec succès";
        this.errorMessage = '';
        this.hasSubmitted = true;

        this.isLoading = false;

        // navigation Angular propre
        setTimeout(() => {
          this.router.navigate(['/espace-client/dossiers']);
        }, 1200);
      },

      error: (err) => {

        console.error(err);

        this.errorMessage = "Erreur serveur, veuillez réessayer";
        this.isLoading = false;
      }

    });
  }
}
