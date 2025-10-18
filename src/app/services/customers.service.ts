import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    createdDate: string;
    active: boolean;
}

@Injectable({ providedIn: 'root' })
export class CustomersService {
    // Support both shapes:
    //  - environment.apiBase
    //  - environment.keycloak.apiBase
    private base =
        (environment as any).apiBase ??
        (environment as any).keycloak?.apiBase ??
        'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getCustomers() {
        return firstValueFrom(this.http.get<Customer[]>(`${this.base}/downstream`));
    }

    // /api/me requires Spring session cookie; include credentials
    // getMe() {
    //     return firstValueFrom(
    //         this.http.get(`${this.base}/me`, { withCredentials: true })
    //     );
    // }
}
