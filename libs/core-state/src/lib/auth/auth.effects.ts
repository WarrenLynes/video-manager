import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@video-manager/core-data';
import { AppState } from '../index';
import {
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from './auth.actions';
import { IUser } from './auth.reducer';
import { SnackbarService } from '@video-manager/core-data';
import { AppFacade } from '../app/app.facade';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private appFacade: AppFacade,
    private snackbarService: SnackbarService
  ) {}

  authenticate$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticate),
      tap(({type, credentials}) => {
        this.appFacade.addLoad('[AUTHENTICATE]');
        this.snackbarService.openSnackBar(`logging you in as ${credentials.email}`, 500)
      }),
      delay(1000),
      switchMap(({type, credentials}) => {
        return this.service.authenticate(credentials).pipe(
          map(({access_token}) => {
            localStorage.setItem('TOKEN', access_token);
            return authenticateSuccess({token: access_token});
          }),
          catchError(error =>  {
            console.log(error);
            return of(authenticateFailure({error}));
          })
        )
      })
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap((type) => {
        this.appFacade.addLoad('[LOGOUT]');
        this.snackbarService.openSnackBar('adios!', 500)
      }),
      delay(1000),
      switchMap(() => {
        return this.service.logout().pipe(
          map((user: IUser) => logoutSuccess()),
          tap(() => this.snackbarService.openSnackBar('Logout Success')),
          catchError(error => of(logoutFailure()))
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        this.appFacade.removeLoad('[LOGOUT]');
        this.router.navigateByUrl('/login');
      })
    )
  , {dispatch: false});

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(({type, token}) => {
        this.appFacade.removeLoad('[AUTHENTICATE]');
        this.router.navigateByUrl('/')
      })
    )
  , {dispatch: false});
}
