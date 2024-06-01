import { IUser } from "../types/User.model";
import { UserRole } from "../types/UserRole.enum";
import { faker } from "@faker-js/faker";

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