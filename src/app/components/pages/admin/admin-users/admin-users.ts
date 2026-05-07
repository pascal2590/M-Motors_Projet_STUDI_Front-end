import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/admin.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css']
})
export class AdminUsers {

  users: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      }
    });
  }
}