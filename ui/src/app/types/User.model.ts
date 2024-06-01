import { UserRole } from "./UserRole.enum";

export interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
}

export class User implements IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;

    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.role = user.role;
    }

    full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }
}

/** Create/update users */
export interface IUserDto extends Omit<IUser, "id"> {
    password?: string;
}
