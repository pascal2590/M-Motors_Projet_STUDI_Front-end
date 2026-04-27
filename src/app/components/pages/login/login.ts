import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

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

  form = {
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  private apiUrl = 'http://localhost:5119/api/Auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  login() {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.email || !this.form.password) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    this.isLoading = true;

    this.http.post<any>(this.apiUrl, this.form).subscribe({

      next: response => {

        this.isLoading = false;

        // reset
        this.authService.logout();

        // TOKEN
        this.authService.saveToken(response.token);

        // USER
        this.authService.saveUser(response.user ?? response.client);

        // DEBUG
        console.log('ROLE:', this.authService.getUserRole());
        console.log('TYPE:', this.authService.getUserType());
        console.log('IS ADMIN:', this.authService.isBackOffice());

        this.successMessage = "Connexion réussie !";

        const returnUrl = this.route.snapshot.queryParams['returnUrl'];

        setTimeout(() => {

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            return;
          }

          if (this.authService.isBackOffice()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/espace-client']);
          }

        }, 800);
      }
,  

      error: err => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || "Email ou mot de passe incorrect.";
      }
    });
  }
}
