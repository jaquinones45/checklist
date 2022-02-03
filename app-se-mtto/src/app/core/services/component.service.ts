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
export class ComponentService {
    readonly URL_API = environment.url + "component";
    constructor(private http: HttpClient) {}

    getComponent<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.client_id && param.client_id != undefined) httpParams = httpParams.append('client_id', param.client_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getTypeComponentName<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getTypeComponentName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    saveComponent<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateComponent<T>(data): Observable<T> {
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
