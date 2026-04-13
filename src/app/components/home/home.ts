import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  vehicules: any[] = []; // Variable pour stocker les véhicules (Offres du moment)
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
        this.vehicules = data.slice(0, 5); // Affiche les 5 premiers véhicules (Offres du moment)

        // Nombre total de véhicules
        this.totalVehicules = data.length

        // Nombre de résultats affichés
        // this.nombreResultats = this.vehicules.length;
      },
      error: err => console.error(err)
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.resultatsRecherche = [];
      this.resultatsOffres = [];
      this.nombreResultats = 0;
      return;
    }

    // Recherche globale
    this.resultatsRecherche = this.allVehicules.filter(v =>
      (v.marque && v.marque.toLowerCase().includes(term)) ||
      (v.modele && v.modele.toLowerCase().includes(term)) ||
      (v.annee && v.annee.toString().includes(term)) ||
      (v.description && v.description.toLowerCase().includes(term))
    );

    // Recherche dans les offres du moment
    this.resultatsOffres = this.vehicules.filter(v =>
      (v.marque && v.marque.toLowerCase().includes(term)) ||
      (v.modele && v.modele.toLowerCase().includes(term)) ||
      (v.annee && v.annee.toString().includes(term))
    );

    this.nombreResultats = this.resultatsRecherche.length;
  }

}