import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private apiUrl =
    `${environment.apiUrl}/dossiers`;

  constructor(private http: HttpClient) { }

  // DOSSIER ACHAT
  envoyerAchat(dossier: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/achat`,
      dossier
    );

  }

  // DOSSIER LLD
  envoyerLLD(dossier: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/lld`,
      dossier
    );

  }

}
