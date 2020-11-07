import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Events} from './events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private publicEventsUrl = 'http://localhost:3000/api/aat/events';
  private specialEventsUrl = 'http://localhost:3000/api/aat/special';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPublicEvents(): Observable<Array<Events>> {
    return this.http.get<any>(this.publicEventsUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getSpecialEvents(): Observable<Array<Events>> {
    return this.http.get<any>(this.specialEventsUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nReason: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
