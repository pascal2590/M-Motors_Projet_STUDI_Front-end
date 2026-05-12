import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';
import { NavbarComponent } from '../../../navbar/navbar'; 

@Component({
  standalone: true,
  imports: [
    CommonModule, // Pour ngIf / ngFor
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    //RouterLinkActive
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  get userName(): string {
    return this.auth.getDisplayName();
  }

  get userRole(): string | null {
    return this.auth.getUserRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    console.log('ROLE SERVICE:', this.auth.getUserRole());
  }
}
