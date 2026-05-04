import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './commercial-layout.html',
  styleUrls: ['./commercial-layout.css']
})
export class CommercialLayout {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
