import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiUrl = 'http://localhost:5119/api/vehicule';

  constructor(private http: HttpClient) { }

  // Tous les véhicules (US1)
  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  // Filtrer par type (US2)
  getVehiculesByType(type: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(
      `${this.apiUrl}/type/${type}`
    );
  }

  // Obtenir un véhicule par ID (US09)
  getVehiculeById(id: number): Observable<Vehicule> {

    return this.http.get<Vehicule>(
      `${this.apiUrl}/${id}`
    );
  }


}
