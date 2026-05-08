import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import { VehiculeService } from '../../../services/vehicule';
import { Vehicule } from '../../../models/vehicule.model';
import { NavbarComponent } from '../../navbar/navbar';

@Component({
  selector: 'app-vehicule-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './vehicule-detail.html',
  styleUrls: ['./vehicule-detail.css']
})
export class VehiculeDetail implements OnInit {

  vehicule?: Vehicule;

  constructor(
    private route: ActivatedRoute,
    private vehiculeService: VehiculeService
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.vehiculeService
      .getVehiculeById(id)
      .subscribe((data: Vehicule) => {

        this.vehicule = data;

      });

  }

}
