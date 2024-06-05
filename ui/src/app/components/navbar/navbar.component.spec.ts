import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
import { AuthStore } from "../../stores/auth.store";
import { provideRouter } from "@angular/router";
import { routes } from "../../app.routes";
import { ChangeDetectionStrategy, signal } from "@angular/core";
import { mockRoutes, mockUser } from "../../utils/mocks";
import { By } from "@angular/platform-browser";

describe("NavbarComponent", () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockAuthStore: any;

    beforeEach(async () => {
        mockAuthStore = jasmine.createSpyObj("AuthStore", ["$user"]);
        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
            providers: [provideRouter(mockRoutes), { provide: AuthStore, useValue: mockAuthStore }],
        }).overrideComponent(NavbarComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        mockAuthStore = TestBed.inject(AuthStore);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not display a user profile link if no user is logged in", () => {
        const profileLink = fixture.debugElement.query(By.css("[data-testId=userProfileLink]"));
        expect(profileLink).toBeNull();
    });

    it("should display the user's profile link if a user is logged in", () => {
        const $mockUser = signal(mockUser);
        mockAuthStore.$user.and.returnValue($mockUser);
        fixture.detectChanges();

        const profileLink = fixture.debugElement.query(By.css("[data-testId=userProfileLink]"));
        expect(profileLink).not.toBeNull();
    });
});
