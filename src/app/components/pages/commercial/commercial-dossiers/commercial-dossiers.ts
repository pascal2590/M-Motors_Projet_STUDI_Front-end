import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialService, DossierCommercial } from '../../../../services/commercial.service';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial-dossiers.html',
  styleUrls: ['./commercial-dossiers.css']
})
export class CommercialDossiers {

  dossiers: DossierCommercial[] = [];

  constructor(
    private commercialService: CommercialService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadDossiers();
  }

  loadDossiers() {
    this.commercialService.getDossiers().subscribe({
      next: data => {
        this.dossiers = data;
      },
      error: err => {
        console.error('Erreur chargement dossiers', err);
      }
    });
  }

  goToDossier(id: number) {
    this.router.navigate(['/backoffice/dossiers', id]);
  }

}
