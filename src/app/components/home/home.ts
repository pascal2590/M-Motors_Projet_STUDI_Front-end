import { FiltreVehicule } from '../filtre-vehicule/filtre-vehicule';
import { VehiculeList } from '../vehicule-list/vehicule-list';
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';          // ngIf, ngFor
import { FormsModule } from '@angular/forms';            // ngModel
import { RouterModule } from '@angular/router';          // routerLink
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    VehiculeList,
    FiltreVehicule
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  vehicules: any[] = [];
  allVehicules: any[] = [];

  resultatsRecherche: any[] = [];
  totalVehicules = 0;
  nombreResultats = 0;

  searchTerm = '';
  menuOpen = false;

  user: any = null;

  private apiUrl = `${environment.apiUrl}/Vehicule`;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
    this.loadUser();
  }

  currentYear = new Date().getFullYear();

  loadUser(): void {

    if (!this.authService.isLoggedIn()) {
      this.user = null;
      return;
    }

    const storedUser = this.authService.getStoredUser();

    const isBackOffice = this.authService.isBackOffice();

    this.user = {

      prenom: isBackOffice
        ? ''
        : storedUser?.prenom || this.authService.getPrenom(),

      nom: storedUser?.nom || this.authService.getDisplayName(),

      email: storedUser?.email || '',

      role: this.authService.getUserRole() || 'Client'
    };

  }

  handleAuthAction() {
    if (this.user) {
      this.authService.logout();
      this.user = null;
      this.router.navigate(['/']);
    } else {
      this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
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

  loadVehicules() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.allVehicules = data || [];
        this.vehicules = (data || []).slice(0, 5);
        this.totalVehicules = (data || []).length;
      },

      error: (err) => {
        console.error('Erreur API véhicules :', err);
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      this.resultatsRecherche = [];
      return;
    }

    this.resultatsRecherche = this.allVehicules.filter(v =>
      v.marque?.toLowerCase().includes(term) ||
      v.modele?.toLowerCase().includes(term)
    );

    this.nombreResultats = this.resultatsRecherche.length;
  }
}