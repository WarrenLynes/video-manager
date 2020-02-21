import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {iif} from 'rxjs/internal/observable/iif';

// const API_URL = 'https://www.googleapis.com/youtube/v3';
const API_URL = 'api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of([req.url, JSON.parse(localStorage.getItem('access_token'))] || null).pipe(
      switchMap(([url, access_token]) => {
        if(url.indexOf(API_URL) > -1) {
          if(access_token) {
            return next.handle(
              req.clone({headers: req.headers.append('Authorization', 'Bearer ' + access_token.access_token)})
            )
          }
        } else {
          return next.handle(req.clone());
        }
      })
    );
  }
}
