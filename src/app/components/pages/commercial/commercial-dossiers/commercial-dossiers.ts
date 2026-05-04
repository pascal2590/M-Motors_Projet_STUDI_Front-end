import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DossierCommercial {
  id: number;
  client: string;
  vehicule: string;
  status: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial-dossiers.html',
  styleUrls: ['./commercial-dossiers.css']
})
export class CommercialDossiers {

  dossiers: DossierCommercial[] = [];

  ngOnInit() {
    this.dossiers = [
      {
        id: 1,
        client: 'Jean Dupont',
        vehicule: 'BMW X5',
        status: 'En cours'
      },
      {
        id: 2,
        client: 'Marie Martin',
        vehicule: 'Audi A3',
        status: 'Validé'
      }
    ];
  }
}
