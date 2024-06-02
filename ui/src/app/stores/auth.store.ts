import { IUser } from "../types/User.model";
import { AuthService } from "../services/auth.service";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthStore {
    private readonly authService = inject(AuthService);

    private state: any = {
        $isAuthenticated: signal<boolean>(false),
        $user: signal<IUser>({} as IUser),
    };

    public readonly $isAuthenticated = this.state.$isAuthenticated.asReadonly();
    public readonly $user = this.state.$user.asReadonly();

    constructor() {}

    setIsAuthenticated = (isAuthenticated: boolean): void => {
        this.state.$isAuthenticated.set(isAuthenticated);
    };

    setUser = (user: IUser): void => {
        this.state.$user.set(user);
    };
}
