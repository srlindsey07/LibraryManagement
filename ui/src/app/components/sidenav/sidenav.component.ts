import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { iconLibary } from "../../utils/icon-library";
import { AppPath } from "src/app/app.routes";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [RouterModule, FontAwesomeModule],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    bookIcon = iconLibary.book;
    usersIcon = iconLibary.users;
    repeatIcon = iconLibary.repeat;

    circulationLink = AppPath.CIRCULATION;
    booksLink = AppPath.BOOKS;
    usersLink = AppPath.USERS;
}
