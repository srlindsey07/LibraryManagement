import { IUser } from "../types/User.model";
import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UserStore {
    private state: any = {
        $user: signal<IUser>({} as IUser),
        $isAuthenticated: computed((): boolean => {
            return !!this.$user().id;
        }),
    };

    public readonly $user = this.state.$user.asReadonly();
    public readonly $isAuthenticated = this.state.$isAuthenticated;

    constructor() {}

    setUser = (user: IUser): void => {
        this.state.$user.set(user);
    };
}
