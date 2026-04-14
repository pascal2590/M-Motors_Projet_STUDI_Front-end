import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>👤 Espace Client M-Motors</h1>
      <p>Bienvenue dans votre espace personnel.</p>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
      color: white;
    }
  `]
})
export class ClientDashboard { }
