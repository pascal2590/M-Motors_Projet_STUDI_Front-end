import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  vehicules: any[] = [];

  private apiUrl = 'https://localhost:7183/api/Vehicule';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe({
        next: data => {
          this.vehicules = data.slice(0, 5); // Affichage de 5 véhicules
        },
        error: err => console.error(err)
      });
  }

}
