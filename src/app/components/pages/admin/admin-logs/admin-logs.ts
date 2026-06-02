import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLogService } from '../../../../services/admin-log.service';
import { ApplicationLog } from '../../../../models/application-log.model';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-logs.html',
  styleUrls: ['./admin-logs.css']
})
export class AdminLogs implements OnInit {

  logs: ApplicationLog[] = [];
  filteredLogs: ApplicationLog[] = [];

  recherche: string = '';
  niveau: string = '';

  loading = false;

  constructor(private logService: AdminLogService) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {

    this.loading = true;

    const filter = {
      page: 1,
      pageSize: 100,
      niveau: this.niveau || null,
      recherche: this.recherche || null
    };

    this.logService.getLogs(filter).subscribe({
      next: (response) => {

        console.log('REPONSE API LOGS :', response);

        this.logs = response.data ?? [];

        this.filteredLogs = [...this.logs];

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement logs', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {

    this.filteredLogs = this.logs.filter(log => {

      const textMatch =
        !this.recherche ||
        log.message?.toLowerCase().includes(this.recherche.toLowerCase()) ||
        log.endpoint?.toLowerCase().includes(this.recherche.toLowerCase()) ||
        log.utilisateur?.toLowerCase().includes(this.recherche.toLowerCase());

      const levelMatch =
        !this.niveau ||
        log.niveau === this.niveau;

      return textMatch && levelMatch;
    });
  }

  getBadgeClass(level: string): string {

    switch (level?.toUpperCase()) {

      case 'ERROR':
        return 'badge-error';

      case 'WARNING':
        return 'badge-warning';

      case 'INFO':
        return 'badge-info';

      default:
        return 'badge-default';
    }
  }
}