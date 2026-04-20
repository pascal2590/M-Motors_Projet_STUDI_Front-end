import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-dossiers',
  templateUrl: './client-dossiers.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './client-dossiers.css'
})
export class ClientDossiersComponent implements OnInit {

  dossiers: any[] = [];

  constructor(
    private service: ClientService,
    private router: Router
  ) { }

  ngOnInit() {

    console.log('CLIENT-DOSSIERS INIT');

    this.service.getDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openDossier(id: number) {
    this.router.navigate(['/espace-client/dossiers', id]);
  }
}
