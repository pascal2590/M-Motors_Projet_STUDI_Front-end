import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // URL API
  apiUrl =
    'http://localhost:5119/api/Auth/client/login';

  // Formulaire
  form = {
    email: '',
    password: ''
  };

  // Messages
  errorMessage = '';
  successMessage = '';

  // Chargement
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login() {

    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validation simple
    if (!this.form.email ||
      !this.form.password) {

      this.errorMessage =
        "Veuillez remplir tous les champs.";

      return;
    }

    this.isLoading = true;

    this.http.post<any>(
      this.apiUrl,
      this.form
    ).subscribe({

      next: response => {

        this.isLoading = false;

        console.log("LOGIN RESPONSE =", response); // DEBUG

        // TOKEN
        localStorage.setItem('token', response.token);

        // USER COMPLET (IMPORTANT)
        localStorage.setItem(
          'user',
          JSON.stringify(response.client) // ou response.user selon ton API
        );

        this.successMessage = "Connexion réussie !";

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },


      error: err => {

        this.isLoading = false;

        console.error(err);

        if (err.error?.message) {

          this.errorMessage =
            err.error.message;

        } else {

          this.errorMessage =
            "Email ou mot de passe incorrect.";

        }

      }

    });

  }

}
