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

    getDossiers(): Observable<DossierCommercial[]> {
        return this.http.get<DossierCommercial[]>(`${this.apiUrl}/dossiers`);
    }
}
