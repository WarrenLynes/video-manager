import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { accessToken, authenticated, IUser, loading } from './auth.reducer';
import { Credentials } from '@video-manager/core-data';
import { Store } from '@ngrx/store';
import { authenticate as authenticateAction, logout, accessGranted } from './auth.actions';
import { AppState } from '../index';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  get authenticated$(): Observable<boolean> {
    return this.store.select(authenticated);
  }

  get accessToken$(): Observable<any> {
    return this.store.select(accessToken);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<AppState>) {}


  authenticate(credentials: Credentials) {
    this.store.dispatch(authenticateAction({credentials}));
  }

  setAccessToken(access_token: any) {
    this.store.dispatch(accessGranted({access_token}));
    localStorage.setItem('access_token', JSON.stringify(access_token));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
