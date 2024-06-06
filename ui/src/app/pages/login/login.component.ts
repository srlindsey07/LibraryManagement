import { authErrorMessages, formErrorMessages } from "./../../utils/messages";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppPath } from "src/app/app.routes";
import { UserStore } from "src/app/stores/user.store";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService);
    private userStore: UserStore = inject(UserStore);
    private router: Router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl(""),
    });
    errorMessages = formErrorMessages;

    $isLoading = signal<boolean>(false);
    $formErrorMessage = signal<string>("");
    $user = this.userStore.$user;

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

    ngOnInit(): void {
        this.authService.clearSession();
    }

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
                next: user => {
                    this.authService.saveUserId(user.id);
                    this.userStore.setUser(user);

                    this.router.navigate([AppPath.BOOKS]);
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
