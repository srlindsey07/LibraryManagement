import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'ADMIN',
    LIBRARIAN = 'LIBRARIAN',
    BORROWER = 'BORROWER'
}

export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    role: UserRole;
    email: string;
    mobile: string;
    password?: string;
}

@Entity({ name: "users" })
export default class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn("identity", { generatedIdentity: 'ALWAYS' })
    id: number;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.BORROWER
    })
    role: UserRole;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    mobile: string;

    @Column({ nullable: false })
    password: string;
}