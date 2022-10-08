import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPost from 'src/app/models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly baseUrl: string = 'http://localhost:5000/posts';

  constructor(private http: HttpClient) {}

  addPost(post: IPost, token: string) {
    return this.http
      .post<{
        status: 'ok' | 'error';
        post?: IPost;
        error?: string;
      }>(this.baseUrl, post, {headers: {'Authorization': `${token}`}})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
