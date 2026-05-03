import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Important pour router la navbar dans les autres composants
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent { }
