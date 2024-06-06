import { provideRouter } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthLayoutComponent } from "./auth-layout.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { mockRoutes } from "src/app/utils/mocks";

describe("AuthLayoutComponent", () => {
    let component: AuthLayoutComponent;
    let fixture: ComponentFixture<AuthLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthLayoutComponent, HttpClientTestingModule],
            providers: [provideRouter(mockRoutes)],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
