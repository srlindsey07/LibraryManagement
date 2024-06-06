import { AuthService } from "./../../services/auth.service";
import { ChangeDetectionStrategy, Component, inject, Signal } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { iconLibary } from "../../utils/icon-library";
import { Router, RouterModule } from "@angular/router";
import { IUser } from "../../types/User.model";
import { UserStore } from "src/app/stores/user.store";
import { AppPath } from "src/app/app.routes";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterModule, FontAwesomeModule, NgbCollapse],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    private userStore = inject(UserStore);
    private authService = inject(AuthService);
    private router = inject(Router);

    profileLink = AppPath.PROFILE;
    circleUserIcon = iconLibary.circleUser;

    $user: Signal<IUser> = this.userStore.$user;

    constructor() {}

    logout(): void {
        this.authService.logout();
        this.router.navigate([AppPath.LOGIN]);
    }
}
