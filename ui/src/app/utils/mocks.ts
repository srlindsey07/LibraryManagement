import { Routes } from "@angular/router";
import { IUser } from "../types/User.model";
import { UserRole } from "../types/UserRole.enum";
import { faker } from "@faker-js/faker";
import { AppPath } from "../app.routes";

export class MockComponent {}

export const mockRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: AppPath.BOOKS,
    },
    {
        path: AppPath.LOGIN,
        component: MockComponent,
    },
    {
        path: AppPath.PROFILE,
        component: MockComponent,
    },
    {
        path: AppPath.USERS,
        component: MockComponent,
    },
    {
        path: AppPath.BOOKS,
        component: MockComponent,
    },
    {
        path: AppPath.CIRCULATION,
        component: MockComponent,
    },
];

export const mockUser = (): IUser => {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        role: faker.helpers.arrayElement(Object.values(UserRole)),
        email: faker.internet.email(),
    };
};

type SessionStorage = { [key: string]: string };
export class MockSessionStorage {
    private mockSessionStorage: SessionStorage;

    constructor(value?: SessionStorage) {
        this.mockSessionStorage = value || {};

        spyOn(sessionStorage, "setItem").and.callFake((key: string, value: string): string => {
            return (this.mockSessionStorage[key] = <string>value);
        });
        spyOn(sessionStorage, "getItem").and.callFake((key: string): string | null => {
            return this.mockSessionStorage[key] || null;
        });
        spyOn(sessionStorage, "removeItem").and.callFake((key: string) => {
            delete this.mockSessionStorage[key];
        });
        spyOn(sessionStorage, "clear").and.callFake(() => {
            this.mockSessionStorage = {};
        });
    }

    value(): SessionStorage {
        return this.mockSessionStorage;
    }

    setValue(value: SessionStorage): SessionStorage {
        this.mockSessionStorage = value;
        return this.mockSessionStorage;
    }
}
