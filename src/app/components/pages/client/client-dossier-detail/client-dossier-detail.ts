import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dossier-detail',
  templateUrl: './client-dossier-detail.html',
  standalone: true,
  imports: [CommonModule]
})
export class ClientDossierDetailComponent implements OnInit {

  dossier: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private service: ClientService
  ) { }

  ngOnInit() {

    const id = Number(this.route.snapshot.params['id']);

    this.loading = true;

    this.service.getDossierById(id).subscribe({
      next: (data: any) => {

        this.dossier = data;

        console.log('DOSSIER DETAIL =', data);

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


}
