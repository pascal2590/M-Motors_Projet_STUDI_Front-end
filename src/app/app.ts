import { Component, signal } from '@angular/core';

import { VehiculeList } from './components/vehicule-list/vehicule-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VehiculeList // ✅ seulement ça
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Frontend');

}
