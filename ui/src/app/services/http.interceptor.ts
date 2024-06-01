import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        // TODO: Implement a refresh token when url is not the login api
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !req.url.includes("auth/login")) {
                    console.error("Session token expired");
                    // TODO: refresh session token instead of throw error
                    return throwError(() => new Error(error.message));
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}
