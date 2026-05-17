import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    // private api = 'http://localhost:5119/api/admin';
    private api = `${environment.apiUrl}/admin`;

    constructor(private http: HttpClient) { }

    // COMMERCIAUX
    getCommerciaux() {
        return this.http.get<any[]>(`${this.api}/commerciaux`);
    }

    createCommercial(data: any) {
        return this.http.post(`${this.api}/create-commercial`, data);
    }

    deleteCommercial(id: number) {
        return this.http.delete(`${this.api}/commercial/${id}`);
    }

    // TOUS LES UTILISATEURS
    getUsers() {
        return this.http.get<any[]>(`${this.api}/users`);
    }
}