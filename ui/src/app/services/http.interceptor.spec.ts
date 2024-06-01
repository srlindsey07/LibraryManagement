import { TestBed } from "@angular/core/testing";
import { HttpRequestInterceptor } from "./http.interceptor";

describe("HttpRequestInterceptorService", () => {
    let interceptor: HttpRequestInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpRequestInterceptor],
        });
        interceptor = TestBed.inject(HttpRequestInterceptor);
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });
});
