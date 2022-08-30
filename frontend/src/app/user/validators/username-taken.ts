import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsernameTaken implements AsyncValidator {
  readonly validationUrl: string = 'http://localhost:5000/users/username-taken';

  constructor(private http: HttpClient) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    if (!control.value || control.value === '') {
      return of(null);
    }

    const username = control.value;
    const options = { params: new HttpParams().set('username', username) };

    return this.http
      .get<{ usernameTaken: true | false }>(this.validationUrl, options)
      .pipe(
        map((res) =>
          res.usernameTaken === true ? { usernameTaken: true } : null
        )
      );
  };
}
