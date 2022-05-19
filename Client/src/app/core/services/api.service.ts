import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://localhost:7108/api/';

  constructor(private httpClient: HttpClient) { }

  get(path: string): Observable<any> {
    return this.httpClient.get(this.url + path).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getCount(path: string): Observable<any> {
    return this.httpClient.get(this.url + path + '/count').pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getByQuery(path: string, params: HttpParams): Observable<any> {
    return this.httpClient.get(this.url + path, { params: params }).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getById(path: string, id: number): Observable<any> {
    return this.httpClient.get(this.url + path + '/' + id).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  post(path: string, object: any): Observable<any> {
    return this.httpClient.post(this.url + path, object).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  put(path: string, id: number, object: any): Observable<any> {
    return this.httpClient.put(this.url + path + '/' + id, object).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  delete(path: string, id: number): Observable<any> {
    return this.httpClient.delete(this.url + path + '/' + id).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

}
