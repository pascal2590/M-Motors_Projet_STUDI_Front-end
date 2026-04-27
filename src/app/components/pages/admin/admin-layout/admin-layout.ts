import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';

@Component({
  standalone: true,
  imports: [RouterOutlet],
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
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    console.log('ROLE SERVICE:', this.auth.getUserRole());
  }
}
