import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DossierCommercial {
    commercial: string;
    id: number;
    client: string;
    vehicule: string;
    status: string;
    typeDossier: string;
    dateCreation: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommercialService {

    private commercialApi = `${environment.apiUrl}/commercial`;
    private dossiersApi = `${environment.apiUrl}/dossiers`;

    constructor(private http: HttpClient) { }

    // LISTE DOSSIERS COMMERCIAUX
    getDossiers(): Observable<DossierCommercial[]> {
        return this.http.get<DossierCommercial[]>(
            `${this.commercialApi}/dossiers`
        );
    }

  
    // DETAIL DOSSIER
    // GET /api/dossiers/{id}  
    getDossierById(id: number): Observable<any> {
        return this.http.get<any>(
            `${this.dossiersApi}/${id}`
        );
    }

    // UPDATE STATUT DOSSIER
    // PUT /api/dossiers/{id}/statut   
    updateStatutDossier(id: number, statut: string): Observable<any> {
        return this.http.put(
            `${this.dossiersApi}/${id}/statut`,
            `"${statut}"`,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    // ASSIGNATION DOSSIER
    // PUT /api/dossiers/{id}/assign
    assignDossier(id: number): Observable<any> {
        return this.http.put(
            `${this.dossiersApi}/${id}/assign`,
            {}
        );
    }
}