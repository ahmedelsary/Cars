import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'http://localhost:11893/api';

  constructor( private http: HttpClient) { }
  login(user:User) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', user);
  }
  userClaims() {
    return this.http.get(this.BaseURI + '/ApplicationUser/UserClaims');
  }
}
