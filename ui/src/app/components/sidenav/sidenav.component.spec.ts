import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SidenavComponent } from "./sidenav.component";
import { provideRouter } from "@angular/router";
import { mockRoutes } from "src/app/utils/mocks";

describe("SidenavComponent", () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavComponent],
            providers: [provideRouter(mockRoutes)],
        }).compileComponents();

        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
