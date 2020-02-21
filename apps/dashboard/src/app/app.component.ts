import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade } from '@video-manager/core-state';
import { Observable, of, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import gapi from 'gapi-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'video-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  popular$: Observable<any>;
  loading: boolean;

  GoogleAuth;
  isAuthorized;
  currentApiRequest;

  BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  params = {
    'response_type': 'token',
    'redirect_uri': 'http:%2F%2Flocalhost:4200',
    'client_id': '688013510663-706179o1vo6qmp0uvompn9nbt6o27sn4.apps.googleusercontent.com',
    'scope': 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube'
  };
  links = [
    {path: '', title: 'videos', icon: 'access_time'},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.authFacade.authenticated$.pipe(
      withLatestFrom(this.authFacade.accessToken$),
      filter(([x, y]) => x && !y),
      first(),
      map(() => this.onAuthenticate())
      /*map(([, y]) => {
          this.popular$ = this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US', {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + y.access_token
            })
          });
        }
      )*/
      ).subscribe();

    this.appFacade.initialize();
    this.appFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      if (x !== this.loading) {
        this.loading = x;
        this.cdRef.detectChanges()
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


  onLogout() {
    this.authFacade.logout();
  }

  onAuthenticate() {
    console.log(this.BASE_URL + '?response_type=' + this.params.response_type + '&redirect_uri=' + this.params.redirect_uri + '&client_id=' + this.params.client_id + '&scope=' + this.params.scope);
    window.location.replace(this.BASE_URL + '?response_type=' + this.params.response_type + '&redirect_uri=' + this.params.redirect_uri + '&client_id=' + this.params.client_id + '&scope=' + this.params.scope);
  }

}
