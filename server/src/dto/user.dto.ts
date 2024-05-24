import { UserRole } from "../entities/User";

export class UserResponse {
    id: number;
    first_name: string;
    last_name: string;
    role: UserRole;
    email: string;
}