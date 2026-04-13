import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeService } from '../../services/vehicule';
import { Vehicule } from '../../models/vehicule.model';

@Component({
  selector: 'app-vehicule-list',
  standalone: true, // Pour Angular standalone components
  imports: [CommonModule],
  templateUrl: './vehicule-list.html',
  styleUrls: ['./vehicule-list.css']
})
export class VehiculeList implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit(): void {

    this.vehiculeService.getVehicules()
      .subscribe((data: Vehicule[]) => { // type ajouté
        this.vehicules = data;
      });

  }

}
