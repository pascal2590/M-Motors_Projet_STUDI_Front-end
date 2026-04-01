import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';

@Injectable({
  providedIn: 'root'  // fournit le service à l'application entière
})
export class VehiculeService {
  private apiUrl = 'https://localhost:7183/api/vehicule'; // URL de ton backend C#

  constructor(private http: HttpClient) { }

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }
}
