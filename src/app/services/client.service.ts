import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private apiUrl = `${environment.apiUrl}/client`;

    constructor(private http: HttpClient) { }
  
    // CREATE CLIENT    
    create(clientData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, clientData);
    }

        // GET CURRENT CLIENT (OPTIONNEL)  
    getCurrentClient(): Observable<any> {

        const token = localStorage.getItem('token');

        return this.http.get(
            `${this.apiUrl}/me`,
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
            `${this.apiUrl}/dossiers`,
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
            `${this.apiUrl}/dossiers/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    
}
