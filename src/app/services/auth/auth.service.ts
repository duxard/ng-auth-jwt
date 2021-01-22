import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Credentials} from './credentials';
import {API_BASE} from '../restApiBase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = `${API_BASE}/register`;
  private loginUrl = `${API_BASE}/login`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<Credentials> {
    return this.http.post<Credentials>(this.registerUrl, user, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  loginUser(user): Observable<Credentials> {
    return this.http.post<Credentials>(this.loginUrl, user, this.httpOptions)
      .pipe(
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

  loggedIn(): boolean {
    // is the user logged in? (is there a token exists for this user in browser?)
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

}

