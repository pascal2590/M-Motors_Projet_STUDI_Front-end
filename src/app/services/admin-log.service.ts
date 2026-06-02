import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminLogService {

    private readonly apiUrl = `${environment.apiUrl}/admin/logs`;

    constructor(private http: HttpClient) { }

    getLogs(filter: any): Observable<any> {
        return this.http.post<any>(
            this.apiUrl,
            filter
        );
    }
}