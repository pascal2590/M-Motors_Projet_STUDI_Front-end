import { Component, signal } from '@angular/core';

import { Home } from './components/home/home'; // ✅ IMPORTANT

import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { FiltreVehicule } from './components/filtre-vehicule/filtre-vehicule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Home,               // Page d'accueil
    VehiculeList, // Liste des véhicules
    FiltreVehicule // Filtre des véhicules
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Frontend');

}
