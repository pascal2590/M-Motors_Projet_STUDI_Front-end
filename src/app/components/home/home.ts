import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FiltreVehicule } from '../filtre-vehicule/filtre-vehicule';
import { VehiculeList } from '../vehicule-list/vehicule-list';


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

  private apiUrl = 'https://localhost:7183/api/Vehicule';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadVehicules();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  loadVehicules() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => {
        this.allVehicules = data;
        this.vehicules = data.slice(0, 5);

        this.totalVehicules = data.length;
      },
      error: err => console.error(err)
    });
  }

  // Appelée par le composant filtre
  updateSearchTerm(term: string) {
    this.searchTerm = term;
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.resultatsRecherche = [];
      this.resultatsOffres = [];
      this.nombreResultats = 0;
      return;
    }

    this.resultatsRecherche = this.allVehicules.filter(v =>
      (v.marque && v.marque.toLowerCase().includes(term)) ||
      (v.modele && v.modele.toLowerCase().includes(term)) ||
      (v.annee && v.annee.toString().includes(term)) ||
      (v.description && v.description.toLowerCase().includes(term))
    );

    this.resultatsOffres = this.vehicules.filter(v =>
      (v.marque && v.marque.toLowerCase().includes(term)) ||
      (v.modele && v.modele.toLowerCase().includes(term)) ||
      (v.annee && v.annee.toString().includes(term))
    );

    this.nombreResultats = this.resultatsRecherche.length;
  }

}