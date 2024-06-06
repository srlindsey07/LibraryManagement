import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
import { provideRouter } from "@angular/router";
import { mockRoutes } from "../../utils/mocks";
import { By } from "@angular/platform-browser";
import { UserStore } from "src/app/stores/user.store";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("NavbarComponent", () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockUserStore: any;

    beforeEach(async () => {
        mockUserStore = jasmine.createSpyObj("UserStore", ["$user", "setUser"]);
        await TestBed.configureTestingModule({
            imports: [NavbarComponent, HttpClientTestingModule],
            providers: [provideRouter(mockRoutes), { provide: UserStore, useValue: mockUserStore }],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        mockUserStore = TestBed.inject(UserStore);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not display a user profile link if no user is logged in", () => {
        const profileLink = fixture.debugElement.query(By.css("[data-testId=userProfileLink]"));
        expect(profileLink).toBeNull();
    });
});
