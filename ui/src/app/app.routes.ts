import { Routes } from "@angular/router";

export enum AppPath {
    HOME = "",
    LOGIN = "login",
    DASHBOARD = "dashboard",
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
    {
        path: AppPath.DASHBOARD,
        loadComponent: () => import("./pages/dashboard/dashboard.component").then(m => m.DashboardComponent),
    },
];
