import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceLld {
  idService: number;
  nomService: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesLldService {

  private apiUrl = 'http://localhost:5119/api/ServicesLld';

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
