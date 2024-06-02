import { findIconDefinition, IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowUpFromBracket,
    faBars,
    faBook,
    faCircleNotch,
    faCircleUser,
    faMagnifyingGlass,
    faRepeat,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

// Icon library
library.add(faCircleNotch, faCircleUser, faBars, faMagnifyingGlass, faBook, faArrowUpFromBracket, faUsers, faRepeat);

// Icon reference names
type IconNames = "loading" | "circleUser" | "bars" | "search" | "book" | "arrowUpFromBracket" | "users" | "repeat";
type Icons = { [name in IconNames]: IconDefinition };

/**
 * Icon definitions
 *
 * @example
 * ```ts
 * Component({
 *      selector: "example-comp",
 *      imports: [FontAwesomeModule],
 *      template: `
 *          <fa-icon [icon]="loadingIcon"></fa-icon>
 *      `
 * })
 * export class ExampleComponent {
 *      loadingIcon = iconLibrary.loading;
 * }
 * ```
 */
export const iconLibary: Icons = {
    arrowUpFromBracket: findIconDefinition({ prefix: "fas", iconName: "arrow-up-from-bracket" }),
    bars: findIconDefinition({ prefix: "fas", iconName: "bars" }),
    book: findIconDefinition({ prefix: "fas", iconName: "book" }),
    circleUser: findIconDefinition({ prefix: "fas", iconName: "circle-user" }),
    loading: findIconDefinition({ prefix: "fas", iconName: "circle-notch" }),
    search: findIconDefinition({ prefix: "fas", iconName: "magnifying-glass" }),
    users: findIconDefinition({ prefix: "fas", iconName: "users" }),
    repeat: findIconDefinition({ prefix: "fas", iconName: "repeat" }),
};
