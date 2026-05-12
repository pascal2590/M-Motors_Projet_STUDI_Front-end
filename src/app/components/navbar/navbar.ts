import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  user: any = null;

  menuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    // fallback si refresh page
    if (!this.user && this.authService.isLoggedIn()) {
      this.user = {
        prenom: this.authService.getPrenom(),
        nom: '',
        email: ''
      };
    }
  }

  getRoleLabel(): string {

    const role = this.authService.getUserRole();

    switch (role) {

      case 'Administrateur':
        return 'Administrateur';

      case 'Commercial':
        return 'Commercial';

      default:
        return 'Client';
    }
  }

  getDashboardLink(): string {

    const role = this.authService.getUserRole();

    switch (role) {

      case 'Administrateur':
        return '/admin';

      case 'Commercial':
        return '/backoffice';

      default:
        return '/espace-client';
    }
  }

  handleAuthAction() {

    this.authService.logout();

    this.user = null;

    this.router.navigate(['/']);
  }

  goToLogin() {

    this.router.navigate(['/login']);
  }

  toggleMenu() {

    this.menuOpen = !this.menuOpen;

    document.body.style.overflow =
      this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {

    this.menuOpen = false;

    document.body.style.overflow = '';
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }
}