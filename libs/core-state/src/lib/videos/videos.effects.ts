import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { VideosFacade } from './videos.facade';
import * as videosActions from './videos.actions';
import { Video, VideosService, SnackbarService } from '@video-manager/core-data';
import { VideosPartialState } from './videos.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class VideosEffects {
  loadVideos$ = createEffect(() =>
    this.dataPersistence.fetch(videosActions.loadVideos, {
      run: (
        action: ReturnType<typeof videosActions.loadVideos>,
        state: VideosPartialState
      ) => {
        this.appFacade.addLoad('[VIDEOS][LOAD]');
        return this.videosService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Videos')),
          map((videos: Video[]) => videosActions.videosLoaded({ videos: videos })),
          tap(() => this.appFacade.removeLoad('[VIDEOS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof videosActions.loadVideos>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addVideo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(videosActions.createVideo, {
      run: (
        action: ReturnType<typeof videosActions.createVideo>,
        state: VideosPartialState
      ) => {
        this.appFacade.addLoad('[VIDEOS][CREATE]');

        return this.videosService.create(action.video).pipe(
          map((video: Video) => videosActions.videoCreated({ video })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Video')),
          tap(() => this.appFacade.removeLoad('[VIDEOS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof videosActions.createVideo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateVideo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(videosActions.updateVideo, {
      run: (
        action: ReturnType<typeof videosActions.updateVideo>,
        state: VideosPartialState
      ) => {
        this.appFacade.addLoad('[VIDEOS][UPDATE]');

        return this.videosService.update(action.video).pipe(
          map((video: Video) => videosActions.videoUpdated({ video })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Video')),
          tap(() => this.appFacade.removeLoad('[VIDEOS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof videosActions.updateVideo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteVideo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(videosActions.deleteVideo, {
      run: (
        action: ReturnType<typeof videosActions.deleteVideo>,
        state: VideosPartialState
      ) => {
        this.appFacade.addLoad('[VIDEOS][DELETE]');
        return this.videosService.delete(action.video).pipe(
          map((video: Video) => videosActions.videoDeleted({ video })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Video')),
          // tap(() => this.videosFacade.loadVideos()),
          tap(() => this.appFacade.removeLoad('[VIDEOS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof videosActions.deleteVideo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<VideosPartialState>,
    private videosService: VideosService,
    private videosFacade: VideosFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
