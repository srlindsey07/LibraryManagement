import { Routes } from "@angular/router";

export enum AppPath {
    HOME = "",
    LOGIN = "login",
}
export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: AppPath.LOGIN,
    },
    {
        path: AppPath.LOGIN,
        loadComponent: () => import("./pages/login/login.component").then(m => m.LoginComponent),
    },
];
