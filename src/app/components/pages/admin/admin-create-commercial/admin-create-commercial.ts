import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-create-commercial.html',
  styleUrl: './admin-create-commercial.css'
})
export class AdminCreateCommercial {

  form: any;
  success = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: [''],
      email: [''],
      password: ['']
    });
  }

  submit() {
    this.adminService.createCommercial(this.form.value)
      .subscribe({
        next: () => {
          this.success = true;
          this.form.reset();
        }
      });
  }
}

