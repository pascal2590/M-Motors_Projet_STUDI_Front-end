import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // NavbarComponent,
    HttpClientModule
  ],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {

  private apiUrl = `${environment.apiUrl}/Auth/client/register`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  form = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: ''
  };

  // Messages d'avertissements
  successMessage = '';
  errorMessage = '';

  register() {

    this.http.post<any>(this.apiUrl, this.form)
      .subscribe({

        next: response => {
          console.log("Compte créé");
          // Sauvegarde JWT
          localStorage.setItem(
            'token',
            response.token
          );

          // Compte créé avec succès
          this.successMessage =
            "Compte créé avec succès ! Redirection...";

          // Redirection après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);

        },

        error: err => {
          console.error(err);
          alert(
            err.error?.message
            || "Erreur lors de l'inscription"
          );
        }
      });
  }
}
