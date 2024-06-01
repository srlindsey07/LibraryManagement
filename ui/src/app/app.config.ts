import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpRequestInterceptor } from "./services/http.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        provideHttpClient(),
    ],
};
