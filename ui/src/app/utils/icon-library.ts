import { findIconDefinition, IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleNotch, faEye, faEyeSlash);

type IconNames = "loading";
type Icons = { [name in IconNames]: IconDefinition };
export const iconLibary: Icons = {
    loading: findIconDefinition({ prefix: "fas", iconName: "circle-notch" }),
};
