import { Component, signal } from '@angular/core';

import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { FiltreVehicule } from './components/filtre-vehicule/filtre-vehicule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VehiculeList, // Affichage de tous les véhicules
    FiltreVehicule // Filtrage par type de véhicule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Frontend');

}
