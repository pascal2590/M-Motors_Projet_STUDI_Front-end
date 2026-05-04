import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-commerciaux.html',
  styleUrl: './admin-commerciaux.css'
})
export class AdminCommerciaux implements OnInit {

  commerciaux: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminService.getCommerciaux()
      .subscribe(data => this.commerciaux = data);
  }

  delete(id: number) {
    if (!confirm('Supprimer ce commercial ?')) return;

    this.adminService.deleteCommercial(id)
      .subscribe(() => this.load());
  }

  goCreate() {
    this.router.navigate(['/admin/commerciaux/create']);
  }
}
