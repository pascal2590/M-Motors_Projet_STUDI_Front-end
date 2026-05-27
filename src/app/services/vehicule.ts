import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private endpoint = '/Vehicule';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

  constructor(private http: HttpClient) { }

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  getVehiculesByType(type: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(
      `${this.apiUrl}/type/${type}`
    );
  }

  getVehiculeById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(
      `${this.apiUrl}/${id}`
    );
  }

  addVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(
      this.apiUrl,
      vehicule
    );
  }

  updateVehicule(id: number, vehicule: Vehicule): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      vehicule
    );
  }

  deleteVehicule(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
