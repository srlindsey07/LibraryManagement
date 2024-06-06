import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";

export enum AppPath {
    LOGIN = "login",
    CIRCULATION = "circulation",
    USERS = "users",
    BOOKS = "books",
    PROFILE = "profile",
}

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: AppPath.BOOKS,
    },
    {
        path: AppPath.LOGIN,
        loadComponent: () => import("./pages/login/login.component").then(m => m.LoginComponent),
    },
    {
        path: "",
        component: AuthLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: AppPath.CIRCULATION,
                loadComponent: () =>
                    import("./pages/circulation/circulation.component").then(m => m.CirculationComponent),
            },
            {
                path: AppPath.USERS,
                loadComponent: () => import("./pages/users/users.component").then(m => m.UsersComponent),
            },
            {
                path: AppPath.BOOKS,
                loadComponent: () => import("./pages/books/books.component").then(m => m.BooksComponent),
            },
            {
                path: AppPath.PROFILE,
                loadComponent: () => import("./pages/profile/profile.component").then(m => m.ProfileComponent),
            },
        ],
    },
];
