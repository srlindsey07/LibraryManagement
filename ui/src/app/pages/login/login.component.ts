import { authErrorMessages, formErrorMessages } from "./../../utils/messages";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthStore } from "../../stores/auth.store";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService);
    private authStore: AuthStore = inject(AuthStore);
    private router: Router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl(""),
    });
    errorMessages = formErrorMessages;

    $isLoading = signal<boolean>(false);
    $formErrorMessage = signal<string>("");
    $isAuthenticated = this.authStore.$isAuthenticated;
    $user = this.authStore.$user;

    constructor() {
        this.loginForm = this.formBuilder.group(
            {
                email: [
                    "",
                    {
                        validators: [Validators.required, Validators.minLength(5)],
                        updateOn: "blur",
                    },
                ],
                password: [
                    "",
                    {
                        validators: [Validators.required, Validators.minLength(5)],
                        updateOn: "blur",
                    },
                ],
            },
            { updateOn: "submit" }
        );
    }

    // TODO: Clear session storage oninit?

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    onSubmit() {
        this.$formErrorMessage.set("");

        if (this.loginForm.valid) {
            this.$isLoading.set(true);
            this.authService.login(this.email!.value!, this.password!.value!).subscribe({
                next: data => {
                    this.authStore.setIsAuthenticated(true);
                    // TODO: SET TOKEN, USERNAME and ROLE in session storage
                    this.authStore.setUser(data);
                    // this.$isLoginSuccessful.set(true);
                    // this.$user.set(data);
                    this.router.navigate(["/dashboard"]);
                },
                error: err => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.$formErrorMessage.set(authErrorMessages.authFailed());
                    } else {
                        this.$formErrorMessage.set(err.message);
                    }
                },
            });

            this.$isLoading.set(false);
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
