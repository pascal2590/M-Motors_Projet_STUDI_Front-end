import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  vehicules: any[] = [];
  allVehicules: any[] = [];

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
      },
      error: err => console.error(err)
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.vehicules = this.allVehicules.slice(0, 5);
      return;
    }

    this.vehicules = this.allVehicules.filter(v =>
      (v.marque && v.marque.toLowerCase().includes(term)) ||
      (v.modele && v.modele.toLowerCase().includes(term)) ||
      (v.annee && v.annee.toString().includes(term)) ||
      (v.description && v.description.toLowerCase().includes(term))
    );
  }

}