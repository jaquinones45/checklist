import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root",
})
export class ClientService {
    readonly URL_API = environment.url + "client";
    constructor(private http: HttpClient) {}

    getCountryName<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getCountryName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getClient<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    saveClient<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateClient<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .put<T>(`${this.URL_API}/` + data.id, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    public handleError(error: HttpErrorResponse) {
        let errorMessage = "Unknown error!";
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
