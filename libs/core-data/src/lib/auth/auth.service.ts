import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const UrlForSignIn = 'https://mdv-auth-json-server.herokuapp.com/auth/login';
const UrlForSignUp = 'https://mdv-auth-json-server.herokuapp.com/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( private http: HttpClient ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  authenticate({email, password}: Credentials): Observable<any> {
    console.log('authenticate ');
    return this.http.post(UrlForSignIn, {email, password});
  }

  logout(): Observable<any> {
    localStorage.removeItem('TOKEN');
    this._authenticated.next(false);
    return of('ok');
  }
}
