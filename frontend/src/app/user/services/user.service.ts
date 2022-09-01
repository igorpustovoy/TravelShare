import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, ErrorNotification, Observable, retry, throwError } from 'rxjs';
import ILoginResponse from 'src/app/models/LoginResponse';
import IUser from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  createUser(user: IUser) {
    return this.http.post<{status: string, error?: any}>(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError),
    );
  }

  loginUser(username: string, password: string) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, { username, password }).pipe(
      catchError(this.handleError),
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}
