import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboard implements OnInit {

  clientName = 'Client';

  stats = {
    enAttente: 0,
    enEtude: 0,
    acceptes: 0,
    refuses: 0
  };

  dossiers: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    const clientId = this.auth.getUserId();

    if (!clientId) {
      console.warn('Client non connecté');
      return;
    }

    this.http.get<any[]>(
      `http://localhost:5119/api/dossiers/client/${clientId}`
    ).subscribe(dossiers => {

      const norm = (s: string) => s?.toLowerCase().trim();

      this.stats.enAttente = dossiers.filter(d => norm(d.statut) === 'en_attente').length;
      this.stats.enEtude = dossiers.filter(d => norm(d.statut) === 'en_etude').length;
      this.stats.acceptes = dossiers.filter(d => norm(d.statut) === 'accepte').length;
      this.stats.refuses = dossiers.filter(d => norm(d.statut) === 'refuse').length;

      this.dossiers = dossiers.map(d => {

        const docs = d.documents ?? [];

        const total = docs.length;
        const completed = docs.filter((x: any) => x.cheminFichier).length;

        const progression = total > 0
          ? Math.round((completed / total) * 100)
          : 0;

        return {
          ...d,
          progression,
          documentsManquants: docs
            .filter((x: any) => !x.cheminFichier)
            .map((x: any) => this.getLibelleDocument(x.typeDocument))
        };
      });

      // NOM CLIENT
      const prenom = this.auth.getPrenom();

      if (prenom) {
        this.clientName = prenom;
      }

    });
  }

  getLibelleDocument(type: string): string {
    switch (type) {
      case 'identite': return 'Pièce d’identité';
      case 'domicile': return 'Justificatif de domicile';
      case 'revenus': return 'Justificatif de revenus';
      case 'rib': return 'RIB';
      case 'permis': return 'Permis de conduire';
      default: return type;
    }
  }

  goToDossier(id: number): void {
    this.router.navigate(['/espace-client/dossiers', id]);
  }
}
