import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // =========================
  // TOKEN
  // =========================

  getToken(): string | null {

    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      return null;
    }

    return token;
  }

  // =========================
  // USER ID depuis JWT
  // =========================

  getUserId(): number | null {

    const token = this.getToken();

    if (!token) return null;

    try {

      const payload =
        JSON.parse(atob(token.split('.')[1]));

      const userId =
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      return userId
        ? Number(userId)
        : null;

    }
    catch {

      console.warn("Token invalide");

      return null;

    }

  }

  // =========================
  // USER depuis localStorage
  // =========================

  getUser(): any | null {

    const user =
      localStorage.getItem('user');

    if (!user || user === 'undefined') {
      return null;
    }

    try {

      return JSON.parse(user);

    }
    catch {

      return null;

    }

  }

  // =========================
  // Vérifier connexion
  // =========================

  isLoggedIn(): boolean {

    const token = this.getToken();

    if (!token) return false;

    try {

      const payload =
        JSON.parse(atob(token.split('.')[1]));

      const expiration =
        payload.exp * 1000;

      return Date.now() < expiration;

    }
    catch {

      return false;

    }

  }

  // =========================
  // LOGOUT
  // =========================

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('prenom');

  }

}
