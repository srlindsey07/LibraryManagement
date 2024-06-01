import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/env.dev";
import { Observable } from "rxjs";
import { IUser } from "../types/User.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly authUrl = environment.authApiUrl;
    private readonly ACCESS_TOKEN = "access_token";

    private httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor() {}

    login(email: string, password: string): Observable<IUser> {
        const body = {
            email,
            password,
        };
        return this.http.post<any>(`${this.authUrl}/login`, body, this.httpOptions);
    }

    // TODO: Implement in API
    refreshToken() {
        return this.http.post(`${this.authUrl}/refresh`, {}, this.httpOptions);
    }

    /////////////////////
    // SESSION STORAGE //
    /////////////////////
    clearSession(): void {
        window.sessionStorage.clear();
    }

    saveToken(token: string): void {
        window.sessionStorage.removeItem(this.ACCESS_TOKEN);
        window.sessionStorage.setItem(this.ACCESS_TOKEN, token);
    }

    getToken(): string | {} {
        const token = window.sessionStorage.getItem(this.ACCESS_TOKEN);
        if (token) {
            return token;
        }
        return {};
    }

    isLoggedIn(): boolean {
        const token = window.sessionStorage.getItem(this.ACCESS_TOKEN);
        return !!token;
    }
}
