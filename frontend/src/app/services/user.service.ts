import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUser from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  createUser(user: IUser) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  
}
