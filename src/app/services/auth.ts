import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TOKEN
  getToken(): string | null {
    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      return null;
    }

    return token;
  }

  // PAYLOAD JWT
  private getPayload(): any | null {

    const token = this.getToken();

    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    }
    catch (e) {
      console.warn('Token invalide');
      return null;
    }
  }

  // USER ID (IMPORTANT POUR TON DASHBOARD)
  getUserId(): number | null {

    const payload = this.getPayload();

    if (!payload) return null;

    const userId =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    return userId ? Number(userId) : null;
  }

  // PRÉNOM / NOM (si présent dans le JWT)
  getUserName(): string {

    const payload = this.getPayload();

    if (!payload) return 'Client';

    const prenom =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];

    const nom =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];

    if (prenom) {
      return prenom;
    }

    return 'Client';
  }

  // USER COMPLET
  getUser(): any | null {
    return this.getPayload();
  }

   // AUTH CHECK
  isLoggedIn(): boolean {

    const payload = this.getPayload();

    if (!payload) return false;

    const exp = payload.exp;

    if (!exp) return false;

    return Date.now() < exp * 1000;
  }

   // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
  }

  getPrenom(): string | null {
    const user = this.getUser();

    return user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    ] ?? null;
  }

}
