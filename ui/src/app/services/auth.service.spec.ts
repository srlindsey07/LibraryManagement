import { MockSessionStorage } from "./../utils/mocks";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/env.dev";
import { mockUser } from "../utils/mocks";
import { faker } from "@faker-js/faker";
import { HttpErrorResponse } from "@angular/common/http";

describe("AuthService", () => {
    let authService: AuthService;
    let controller: HttpTestingController;
    const apiUrl = environment.authApiUrl;
    let mockSessionStorage: MockSessionStorage;

    beforeEach(() => {
        mockSessionStorage = new MockSessionStorage();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        authService = TestBed.inject(AuthService);
        controller = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        expect(authService).toBeTruthy();
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

    describe("Session storage management", () => {
        const ACCESS_TOKEN = "access_token";

        it("saveToken() should save the provided token to session storage", () => {
            const token = faker.string.alphanumeric(15);

            authService.saveToken(token);

            expect(mockSessionStorage.value()).toEqual({ access_token: token });
        });

        it("getToken() should return the access token if it exists", () => {
            const expectedToken = faker.string.alphanumeric(15);
            mockSessionStorage.setValue({ access_token: expectedToken });

            const actualToken = authService.getToken();

            expect(actualToken).toEqual(expectedToken);
        });

        it("getToken() should return an empty object it access token does not exist", () => {
            const actualToken = authService.getToken();

            expect(actualToken).toEqual({});
        });

        it("isLoggedIn() should return true if an access token exists in session storage", () => {
            const expectedToken = faker.string.alphanumeric(15);
            mockSessionStorage.setValue({ access_token: expectedToken });

            const isLoggedIn = authService.isLoggedIn();
            expect(isLoggedIn).toBe(true);
        });

        it("isLoggedIn() should return true if an access token exists in session storage", () => {
            const isLoggedIn = authService.isLoggedIn();
            expect(isLoggedIn).toBe(false);
        });
    });
});
