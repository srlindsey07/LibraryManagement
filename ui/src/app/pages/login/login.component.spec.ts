import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { AuthService } from "../../services/auth.service";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { HttpErrorResponse } from "@angular/common/http";
import { authErrorMessages } from "../../utils/messages";
import { ChangeDetectionStrategy } from "@angular/core";
import { mockUser } from "../../utils/mocks";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockAuthService: any;

    beforeEach(async () => {
        mockAuthService = jasmine.createSpyObj("AuthService", ["login", "clearSession", "saveUserId"]);
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).createComponent(LoginComponent);

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        mockAuthService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("onSubmit()", () => {
        describe("when the login form is valid", () => {
            const email = "abc@123.com";
            const password = "mypassword";

            beforeEach(() => {
                component.email?.setValue(email);
                component.password?.setValue(password);
            });

            it("should call authService.login() with email and password", () => {
                const loginSpy = mockAuthService.login.and.returnValue(of(mockUser));

                component.onSubmit();

                expect(loginSpy).toHaveBeenCalledWith(email, password);
            });

            it("should set $user to the user data returned from the service", () => {
                const expectedUser = mockUser;
                mockAuthService.login.and.returnValue(of(expectedUser));

                component.onSubmit();

                expect(component.$user()).toEqual(expectedUser);
            });

            it("should display the authentication failed message if authService.login() returns a 401", async () => {
                const errorResponse401 = new HttpErrorResponse({ status: 401 });
                mockAuthService.login.and.callFake(() => throwError(() => errorResponse401));

                component.onSubmit();
                fixture.detectChanges();

                const errorMsg = fixture.debugElement.query(By.css("[data-testId=formErrorMessage]")).nativeElement;
                expect(errorMsg.textContent.trim()).toBe(authErrorMessages.authFailed());
            });

            it("should display the returned error message if authService.login() returns an error other than a 401", () => {
                const msg = "Test error message";
                const errorResponse = new Error(msg);
                mockAuthService.login.and.callFake(() => throwError(() => errorResponse));

                component.onSubmit();
                fixture.detectChanges();

                const errorMsg = fixture.debugElement.query(By.css("[data-testId=formErrorMessage]")).nativeElement;
                expect(errorMsg.textContent.trim()).toBe(msg);
            });
        });
    });
});
