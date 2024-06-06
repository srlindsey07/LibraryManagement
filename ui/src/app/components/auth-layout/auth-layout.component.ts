import { CommonModule } from "@angular/common";
import { Component, inject, Signal } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { UserStore } from "src/app/stores/user.store";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-auth-layout",
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent, SidenavComponent],
    templateUrl: "./auth-layout.component.html",
    styleUrl: "./auth-layout.component.scss",
})
export class AuthLayoutComponent {
    private userStore = inject(UserStore);

    $isAuthenticated: Signal<boolean> = this.userStore.$isAuthenticated;
}
