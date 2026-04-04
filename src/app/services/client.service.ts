import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'https://localhost:7183/api/client'; // URL du backend

    constructor(private http: HttpClient) { }

    create(clientData: Client): Observable<Client> {
        return this.http.post<Client>(this.apiUrl, clientData);
    }
}
