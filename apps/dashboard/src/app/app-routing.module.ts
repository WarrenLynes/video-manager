import { NgModule } from '@angular/core';
import { LoginComponent, NotFoundComponent, UiModule } from '@video-manager/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { VideosComponent } from './videos/component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: '404', component: NotFoundComponent },
      { path: 'login', component: LoginComponent },
      {path: '', canActivate: [AuthGuard], component: VideosComponent},
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
