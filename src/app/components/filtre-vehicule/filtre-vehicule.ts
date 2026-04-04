import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeService } from '../../services/vehicule';
import { Vehicule } from '../../models/vehicule.model';

@Component({
  selector: 'app-filtre-vehicule',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './filtre-vehicule.html',

  styleUrl: './filtre-vehicule.css'
})
export class FiltreVehicule implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit(): void {

    this.loadAllVehicules();

  }

  // Charger tous les véhicules
  loadAllVehicules() {

    this.vehiculeService
      .getVehicules()
      .subscribe({
        next: (data) => {
          this.vehicules = data;
        },
        error: (err) => {
          console.error(err);
          this.vehicules = [];
        }
      });

  }

  // Filtrer vente / location
  filtrer(type: string) {

    this.vehiculeService
      .getVehiculesByType(type)
      .subscribe({
        next: (data) => {
          this.vehicules = data;
        },
        error: (err) => {
          console.error(err);
          this.vehicules = [];
        }
      });

  }

  // Reset filtre
  resetFiltre() {

    this.loadAllVehicules();

  }

}
