import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-clients.html',
  styleUrls: ['./admin-clients.css']
})
export class AdminClients implements OnInit {

  clients: any[] = [];

  loading = true;

  errorMessage = '';

  // TRI
  sortColumn = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.loadClients();
  }

  loadClients(): void {

    this.http.get<any[]>(
      `${environment.apiUrl}/client`
    ).subscribe({

      next: data => {

        this.clients = data;

        this.loading = false;
      },

      error: err => {

        console.error(err);

        this.errorMessage =
          "Impossible de charger les clients.";

        this.loading = false;
      }
    });
  }

  // TRI CLIENTS
  sortClients(column: string): void {

    // Inverser le sens si même colonne
    if (this.sortColumn === column) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';
    }

    else {

      this.sortColumn = column;

      this.sortDirection = 'asc';
    }

    this.clients.sort((a, b) => {

      let valueA = a[column];
      let valueB = b[column];

      // Gestion null / undefined
      valueA = valueA ?? '';
      valueB = valueB ?? '';

      // Texte en minuscule
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }

      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }
}