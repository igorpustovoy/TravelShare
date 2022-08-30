import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import IUser from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  createUser(user: IUser) {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError),
      // retry(3)
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
