import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  logoutAndRedirect(): void {
    this.logout();
    this.router.navigate(['/login']);
  }

  // TOKEN
  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return null;
    return token;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // USER LOCAL STORAGE : Seulement pour l'interface utilisateur - ne contient pas d'informations sensibles
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStoredUser(): any | null {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  // JWT PAYLOAD EXTRACTION - SOURCE UNIQUE POUR INFOS UTILISATEUR
  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  // USER ID - SOURCE UNIQUE
  getUserId(): number | null {
    const payload = this.getPayload();
    if (!payload) return null;

    const id =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    return id ? Number(id) : null;
  }

  // NAME
  getUserName(): string {
    const payload = this.getPayload();
    if (!payload) return 'Utilisateur';

    const prenom =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];

    return prenom || 'Utilisateur';
  }

  getPrenom(): string | null {
    const payload = this.getPayload();

    return payload?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    ] ?? null;
  }

  // ROLE - SOURCE UNIQUE
  getUserRole(): string | null {
    const payload = this.getPayload();

    return payload?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] ?? null;
  }

  // CHECK ADMIN
  isAdmin(): boolean {
    const role = this.getUserRole();

    return role === 'Administrateur';
  }

  // CHECK BACKOFFICE
  private backOfficeRoles = [
    'Administrateur',
    'Admin',
    'BackOffice',
    'Commercial'
  ];

  isBackOffice(): boolean {
    const role = this.getUserRole();
    return role ? this.backOfficeRoles.includes(role) : false;
  }

  // CHECK CLIENT
  isClient(): boolean {
    return !this.isBackOffice();
  }

  // AUTH STATUS
  isLoggedIn(): boolean {
    const payload = this.getPayload();

    if (!payload) return false;

    const exp = payload.exp;

    return exp ? Date.now() < exp * 1000 : false;
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // TYPE D'UTILISATEUR (Client / BackOffice)
  getUserType(): 'Client' | 'BackOffice' | null {

    const role = this.getUserRole();

    if (!role) return null;

    const backOfficeRoles = [
      'Administrateur',
      'Commercial'
    ];

    return backOfficeRoles.includes(role)
      ? 'BackOffice'
      : 'Client';
  }

  getDisplayName(): string {

    // priorité user localStorage (UI API réponse)
    const stored = this.getStoredUser();

    if (stored?.prenom) return stored.prenom;
    if (stored?.name) return stored.name;
    if (stored?.nom && stored?.prenom) {
      return `${stored.prenom} ${stored.nom}`;
    }

    // fallback JWT
    const payload = this.getPayload();

    const prenom = payload?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    ];

    const nom = payload?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
    ];

    if (prenom && nom) return `${prenom} ${nom}`;
    if (prenom) return prenom;
    if (nom) return nom;

    return 'Utilisateur';
  }

  isCommercial(): boolean {
    return this.getUserRole() === 'Commercial';
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  redirectByRole(): string {

    const role = this.getUserRole();

    switch (role) {
      case 'Administrateur':
        return '/admin';

      case 'Commercial':
        return '/backoffice';

      default:
        return '/espace-client';
    }
  }


}
