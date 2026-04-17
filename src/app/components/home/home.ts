import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { FiltreVehicule } from '../filtre-vehicule/filtre-vehicule';
import { VehiculeList } from '../vehicule-list/vehicule-list';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FiltreVehicule,
    VehiculeList
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  vehicules: any[] = [];
  allVehicules: any[] = [];

  resultatsRecherche: any[] = [];
  resultatsOffres: any[] = [];

  totalVehicules: number = 0;
  nombreResultats: number = 0;

  menuOpen = false;
  searchTerm = '';

  // USER CONNECTÉ
  user: any = null;
  isLoggedIn = false;

  private apiUrl =
    'http://localhost:5119/api/Vehicule';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadVehicules();

    this.loadUser();

  }

  // =========================
  // USER CONNECTÉ
  // =========================

  loadUser() {

    // Vérifier de la connexion
    if (!this.authService.isLoggedIn()) {

      this.user = null;
      this.isLoggedIn = false;

      return;
    }

    const token =
      this.authService.getToken();

    this.http.get<any>(
      "http://localhost:5119/api/Auth/client/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: user => {

        this.user = user;
        this.isLoggedIn = true;

      },

      error: err => {

        console.error(err);

        this.user = null;
        this.isLoggedIn = false;

      }

    });

  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();

    this.user = null;
    this.isLoggedIn = false;

    this.router.navigate(['/']);

  }

  // =========================
  // MENU
  // =========================

  toggleMenu() {

    this.menuOpen = !this.menuOpen;

  }

  // =========================
  // VEHICULES
  // =========================

  loadVehicules() {

    this.http.get<any[]>(this.apiUrl)
      .subscribe({

        next: data => {

          this.allVehicules = data;

          this.vehicules =
            data.slice(0, 5);

          this.totalVehicules =
            data.length;

        },

        error: err =>
          console.error(err)

      });

  }

  // =========================
  // RECHERCHE
  // =========================

  updateSearchTerm(term: string) {

    this.searchTerm = term;

  }

  search() {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!term) {

      this.resultatsRecherche = [];
      this.resultatsOffres = [];
      this.nombreResultats = 0;

      return;

    }

    this.resultatsRecherche =
      this.allVehicules.filter(v =>

        (v.marque &&
          v.marque.toLowerCase().includes(term)) ||

        (v.modele &&
          v.modele.toLowerCase().includes(term)) ||

        (v.annee &&
          v.annee.toString().includes(term)) ||

        (v.description &&
          v.description.toLowerCase().includes(term))

      );

    this.resultatsOffres =
      this.vehicules.filter(v =>

        (v.marque &&
          v.marque.toLowerCase().includes(term)) ||

        (v.modele &&
          v.modele.toLowerCase().includes(term)) ||

        (v.annee &&
          v.annee.toString().includes(term))

      );

    this.nombreResultats =
      this.resultatsRecherche.length;

  }

}
