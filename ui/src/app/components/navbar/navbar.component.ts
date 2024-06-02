import { ChangeDetectionStrategy, Component, inject, Signal } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { iconLibary } from "../../utils/icon-library";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../stores/auth.store";
import { IUser } from "../../types/User.model";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterModule, FontAwesomeModule, NgbCollapse],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    private authStore = inject(AuthStore);

    menuCollapsed: boolean = true;
    circleUserIcon = iconLibary.circleUser;
    barsIcon = iconLibary.bars;

    $user: Signal<IUser> = this.authStore.$user;

    constructor() {}

    menuClose() {
        this.menuCollapsed = true;
    }
}
