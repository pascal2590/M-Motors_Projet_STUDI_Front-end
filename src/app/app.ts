import { Component, signal } from '@angular/core';

import { Home } from './components/home/home'; // ✅ IMPORTANT

import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { FiltreVehicule } from './components/filtre-vehicule/filtre-vehicule';
import { CreateClientComponent } from './components/create-client/create-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Home, //
    VehiculeList, // Affichage de tous les véhicules
    FiltreVehicule, // Filtrage par type de véhicule
    CreateClientComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Frontend');

}
