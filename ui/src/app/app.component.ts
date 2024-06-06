import { Component, inject, Signal } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UserStore } from "./stores/user.store";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, RouterModule, CommonModule, FontAwesomeModule],
    providers: [],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    private userStore = inject(UserStore);

    title = "Library Management System";
    $isAuthenticated: Signal<boolean> = this.userStore.$isAuthenticated;

    constructor() {}
}
