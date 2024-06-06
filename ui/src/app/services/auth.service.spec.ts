import { MockSessionStorage } from "./../utils/mocks";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/env.dev";
import { mockUser } from "../utils/mocks";
import { faker } from "@faker-js/faker";
import { HttpErrorResponse } from "@angular/common/http";
import { UserStore } from "../stores/user.store";

describe("AuthService", () => {
    let authService: AuthService;
    let userStore: UserStore;
    let controller: HttpTestingController;
    const apiUrl = environment.authApiUrl;
    let mockSessionStorage: MockSessionStorage;

    beforeEach(() => {
        mockSessionStorage = new MockSessionStorage();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        authService = TestBed.inject(AuthService);
        userStore = TestBed.inject(UserStore);
        controller = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        expect(authService).toBeTruthy();
    });

    it("setIsAuthenticated() should set the value of isAuthenticated", () => {
        authService.setIsAuthenticated(true);

        expect(authService.isAuthenticated()).toBe(true);
    });

    describe("login()", () => {
        const password = faker.internet.password();
        const loginApiUrl = `${apiUrl}/login`;

        it("should return user information if successful", () => {
            const expectedRes = mockUser();
            authService.login(expectedRes.email, password).subscribe(res => expect(res).toEqual(expectedRes));

            const request = controller.expectOne(`${loginApiUrl}`);
            request.flush(expectedRes);
            controller.verify();

            expect(request.request.body).toEqual({ email: expectedRes.email, password });
        });

        it("should return an error if unsuccessful", () => {
            const status = 500;
            const statusText = "Server error";
            const errorEvent = new ProgressEvent("API error");

            let actualError: HttpErrorResponse | undefined;
            authService.login(faker.internet.email(), password).subscribe({
                next: () => fail("Next handler should not be called"),
                error: error => (actualError = error),
                complete: () => fail("Complete handler should not be called"),
            });

            controller.expectOne(loginApiUrl).error(errorEvent, { status, statusText });

            if (!actualError) {
                fail("Error should be defined");
            }
            expect(actualError?.error).toBe(errorEvent);
            expect(actualError?.status).toBe(status);
            expect(actualError?.statusText).toBe(statusText);
        });
    });

    it("logout() should clear the session and remove user data", () => {
        const user = mockUser();
        mockSessionStorage.setValue({ user_id: user.id.toString() });
        userStore.setUser(user);
        authService.setIsAuthenticated(true);

        expect(mockSessionStorage.value()).toEqual({ user_id: user.id.toString() });
        expect(userStore.$user()).toEqual(user);
        expect(authService.isAuthenticated()).toBe(true);

        authService.logout();

        expect(mockSessionStorage.value()).toEqual({});
        expect(userStore.$user()).toEqual({});
        expect(authService.isAuthenticated()).toBe(false);
    });

    describe("Session storage management", () => {
        beforeEach(() => {
            mockSessionStorage.setValue({});
        });

        it("clearSession() should clear session storage", () => {
            mockSessionStorage.setValue({ user_id: "test" });
            authService.setIsAuthenticated(true);

            expect(mockSessionStorage.value()).toEqual({ user_id: "test" });
            expect(authService.isAuthenticated()).toBe(true);

            authService.clearSession();

            expect(mockSessionStorage.value()).toEqual({});
            expect(authService.isAuthenticated()).toBe(false);
        });

        it("saveUserId() should save the user's id to session storage", () => {
            const userId = faker.number.int({ min: 1, max: 1000 });

            authService.saveUserId(userId);

            expect(mockSessionStorage.value()).toEqual({ user_id: userId.toString() });
            expect(authService.isAuthenticated()).toBe(true);
        });

        describe("hasSession()", () => {
            beforeEach(() => {
                mockSessionStorage.setValue({});
            });

            it("should return true if the user has an active session", () => {
                mockSessionStorage.setValue({ user_id: "test" });

                expect(authService.hasSession()).toBe(true);
            });

            it("should return true if the user does not have an active session", () => {
                expect(authService.hasSession()).toBe(false);
            });
        });
    });
});
