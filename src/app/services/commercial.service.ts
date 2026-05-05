import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DossierCommercial {
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

    private apiUrl = 'http://localhost:5119/api/commercial';

    constructor(private http: HttpClient) { }

    // LISTE des dossiers commerciaux
    getDossiers(): Observable<DossierCommercial[]> {
        return this.http.get<DossierCommercial[]>(`${this.apiUrl}/dossiers`);
    }

    // DETAIL du dossier (OK tu gardes dossiers controller)
    getDossierById(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:5119/api/dossiers/${id}`);
    }

    // ✅ FIX IMPORTANT : correction endpoint backend réel
    updateStatutDossier(id: number, statut: string): Observable<any> {
        return this.http.put(
            `http://localhost:5119/api/dossiers/${id}/statut`,
            JSON.stringify(statut),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
