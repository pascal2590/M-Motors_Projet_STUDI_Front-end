import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboard implements OnInit {

  // 👋 Nom affiché dans "Bienvenue"
  clientName: string = 'Client';

  // 📊 Statistiques dossiers
  stats = {
    enAttente: 0,
    acceptes: 0,
    refuses: 0
  };

  // 📄 Dernier dossier
  lastDossier: any = null;

  // ⚠️ Documents manquants (nécessaire pour ton HTML)
  documentsManquants: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.http.get<any[]>(
      'http://localhost:5119/api/dossiers'
    ).subscribe(dossiers => {

      console.log("DOSSIERS =", dossiers);

      const normalize = (s: string) =>
        s?.toLowerCase().trim();

      // 📊 Stats
      this.stats.enAttente = dossiers.filter(d =>
        normalize(d.statut) === 'en_attente'
      ).length;

      this.stats.acceptes = dossiers.filter(d =>
        normalize(d.statut) === 'accepte'
      ).length;

      this.stats.refuses = dossiers.filter(d =>
        normalize(d.statut) === 'refuse'
      ).length;

      // 📄 Dernier dossier (le plus récent)
      this.lastDossier = dossiers.length > 0
        ? dossiers.sort((a, b) =>
          new Date(b.dateCreation).getTime() -
          new Date(a.dateCreation).getTime()
        )[0]
        : null;

      // Nom affiché
      this.clientName = this.lastDossier
        ? `Client #${this.lastDossier.clientId}`
        : 'Client';

      // Simulation des documents manquants (temporaire)
      if (this.lastDossier &&
        normalize(this.lastDossier.statut) === 'en_attente') {

        this.documentsManquants = [
          'Pièce d’identité',
          'Justificatif de domicile'
        ];

      } else {

        this.documentsManquants = [];

      }

    });
  }

  goToDossier(id: number): void {
    this.router.navigate(['/espace-client/dossiers', id]);
  }

}
