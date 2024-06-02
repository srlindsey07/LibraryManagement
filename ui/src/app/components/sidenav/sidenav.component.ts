import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { iconLibary } from "../../utils/icon-library";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [RouterModule, FontAwesomeModule],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    searchIcon = iconLibary.search;
    bookIcon = iconLibary.book;
    arrowFromBracketIcon = iconLibary.arrowUpFromBracket;
    usersIcon = iconLibary.users;
    repeatIcon = iconLibary.repeat;
}
