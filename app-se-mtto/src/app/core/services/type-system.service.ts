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
export class TypeSystemService {
    readonly URL_API = environment.url + "type-system";
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

    getTypeSystemName<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.client_id && param.client_id != undefined) httpParams = httpParams.append('client_id', param.client_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getTypeSystemName`, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    getTypeSystem<T>(param): Observable<T> {
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

    getTypeSystemRevision<T>(param): Observable<T> {
        let httpParams = new HttpParams();
        if (param.type_system_id && param.type_system_id != undefined) httpParams = httpParams.append('type_system_id', param.type_system_id)

        const options = {
            params: httpParams,
            headers: new HttpHeaders({}),
        };
        return this.http
            .get<T>(`${this.URL_API}/getRevision`, options)
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

    saveTypeSystem<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    saveTypeSystemRevision<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .post<T>(`${this.URL_API}/saveRevision`, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateTypeSystem<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .put<T>(`${this.URL_API}/` + data.id, data, options)
            .pipe(retry(3), catchError(this.handleError));
    }

    updateTypeSystemRevision<T>(data): Observable<T> {
        const options = {
            headers: new HttpHeaders({}),
        };
        return this.http
            .put<T>(`${this.URL_API}/updateRevision/${data.id}`, data, options)
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
