import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/env.dev";
import { Observable } from "rxjs";
import { IUser } from "../types/User.model";
import { UserStore } from "../stores/user.store";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly userStore: UserStore = inject(UserStore);
    private readonly authUrl = environment.authApiUrl;
    private readonly USER_ID = "user_id";
    private readonly httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    private $isAuthenticated = signal<boolean>(false);

    constructor() {
        this.$isAuthenticated.set(this.hasSession());
    }

    readonly isAuthenticated = this.$isAuthenticated.asReadonly();

    setIsAuthenticated(value: boolean): void {
        this.$isAuthenticated.set(value);
    }

    login(email: string, password: string): Observable<IUser> {
        const body = {
            email,
            password,
        };
        return this.http.post<any>(`${this.authUrl}/login`, body, this.httpOptions);
    }

    // TODO: Implement in API
    refreshToken() {
        return this.http.post<any>(`${this.authUrl}/refresh`, {}, this.httpOptions);
    }

    logout(): void {
        this.clearSession();
        this.userStore.setUser({} as IUser);
        this.$isAuthenticated.set(false);
    }

    /////////////////////
    // SESSION STORAGE //
    /////////////////////
    clearSession(): void {
        window.sessionStorage.clear();
        this.$isAuthenticated.set(false);
    }

    hasSession(): boolean {
        return !!window.sessionStorage.getItem(this.USER_ID);
    }

    saveUserId(id: number): void {
        window.sessionStorage.removeItem(this.USER_ID);
        window.sessionStorage.setItem(this.USER_ID, id.toString());
        this.$isAuthenticated.set(true);
    }
}
