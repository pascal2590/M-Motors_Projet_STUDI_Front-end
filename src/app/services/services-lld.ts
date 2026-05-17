import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface ServiceLld {
  idService: number;
  nomService: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesLldService {

  private apiUrl = `${environment.apiUrl}/ServicesLld`;

  constructor(private http: HttpClient) { }

  // Récupère tous les services LLD
  getAll(): Observable<ServiceLld[]> {
    return this.http.get<ServiceLld[]>(this.apiUrl);
  }

  // Méthode pour récupérer un service LLD par son ID
  getById(id: number): Observable<ServiceLld> {
    return this.http.get<ServiceLld>(`${this.apiUrl}/${id}`);
  }
}
