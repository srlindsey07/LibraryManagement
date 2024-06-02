import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { filter, tap } from "rxjs";
import { AppPath } from "./app.routes";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        RouterModule,
        CommonModule,
        FontAwesomeModule,
        NgbCollapseModule,
        NavbarComponent,
        SidenavComponent,
    ],
    providers: [],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    private router = inject(Router);

    title = "Library Management System";
    isOnLoginPage: boolean = true;

    constructor() {
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                tap((event: NavigationEnd) => {
                    console.log(event.url);
                    this.isOnLoginPage = event.url.includes(AppPath.LOGIN);
                })
            )
            .subscribe();
    }
}
