import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehiculeService } from '../../../../services/vehicule';
import { Vehicule } from '../../../../models/vehicule.model';

@Component({
  selector: 'app-commercial-vehicules',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './commercial-vehicules.html',
  styleUrls: ['./commercial-vehicules.css']
})
export class CommercialVehicules implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(
    private vehiculeService: VehiculeService
  ) { }

  ngOnInit(): void {

    this.loadVehicules();
  }

  loadVehicules(): void {

    this.vehiculeService
      .getVehicules()
      .subscribe({

        next: (data) => {

          this.vehicules = data;
        }
      });
  }

  deleteVehicule(vehicule: Vehicule): void {

    const confirmation = confirm(
      `⚠️ Voulez-vous vraiment supprimer le véhicule :\n` +
      `${vehicule.marque} ${vehicule.modele} ?`
    );

    if (!confirmation) {
      return;
    }

    this.vehiculeService
      .deleteVehicule(vehicule.idVehicule)
      .subscribe({

        next: () => {

          this.loadVehicules();
        },

        error: () => {

          alert(
            'Impossible de supprimer ce véhicule.'
          );
        }
      });
  }

}