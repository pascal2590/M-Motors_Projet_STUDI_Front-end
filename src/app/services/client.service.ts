import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private apiUrl = 'http://localhost:5119/api/client';

    constructor(private http: HttpClient) { }
  
    // CREATE CLIENT    
    create(clientData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, clientData);
    }

        // GET CURRENT CLIENT (OPTIONNEL)  
    getCurrentClient(): Observable<any> {

        const token = localStorage.getItem('token');

        return this.http.get(
            'http://localhost:5119/api/Auth/client/me',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).pipe(
            tap(client => {
                // Stockage pour éviter les appels répétés
                localStorage.setItem('client', JSON.stringify(client));
            })
        );
    }    

       // GET DOSSIERS    
    getDossiers(): Observable<any[]> {

        const token = localStorage.getItem('token');

        console.log('CALL NEW ENDPOINT /api/client/dossiers');

        return this.http.get<any[]>(
            `http://localhost:5119/api/client/dossiers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    
    getDossierById(id: number) {

        const token = localStorage.getItem('token');

        return this.http.get(
            `http://localhost:5119/api/client/dossiers/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    
}
