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
export class FormService {
    readonly URL_API = environment.url + "form";
    constructor(private http: HttpClient) {}

    getFormName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.country && param.country != undefined) httpParams = httpParams.append('country', param.country)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getForm`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getComponentName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.client_id && param.client_id != undefined) httpParams = httpParams.append('client_id', param.client_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getComponent`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getTypeQuestionName<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getTypeQuestion`, options)
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

    getCountryName<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getCountryName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getOneForm<T>(id): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getOneForm/${id}`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getForm<T>(): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    saveForm<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    saveFormRevision<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}/revision`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateForm<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .put<T>(`${this.URL_API}/` + data.id, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateFormRevision<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}/revision/` + data.id, data, options)
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
