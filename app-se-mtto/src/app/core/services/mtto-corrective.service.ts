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
export class MttoCorrectiveService {
    readonly URL_API = environment.url + "mtto-corrective";
    constructor(private http: HttpClient) {}

    getPlantName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.client_id && param.client_id != undefined) httpParams = httpParams.append('client_id', param.client_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getPlantName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getSystemName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.plant_id && param.plant_id != undefined) httpParams = httpParams.append('plant_id', param.plant_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getSystemName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getComponentName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.type_system_id && param.type_system_id != undefined) httpParams = httpParams.append('type_system_id', param.type_system_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getComponentName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getOneTypeSystemRevision<T>(revision_id): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getOneRevision/${revision_id}`, options)
            .pipe(retry(3), catchError(this.handleError));
    }
    
    getMttoCorrective<T>(param): Observable<T> {
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

    saveMttoCorrective<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateMttoCorrective<T>(data): Observable<T> {
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
