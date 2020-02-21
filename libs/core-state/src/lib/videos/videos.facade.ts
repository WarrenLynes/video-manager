import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromVideos from './videos.reducer';
import * as videosActions from './videos.actions';
import {
  selectAllVideos,
  selectVideo,
  selectVideosLoading
} from './videos.selectors';
import { Video } from '@video-manager/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VideosFacade {
  allVideos$ = this.store.pipe(select(selectAllVideos));
  selectedVideo$ = this.store.pipe(select(selectVideo));
  videoLoading$ = this.store.pipe(select(selectVideosLoading));

  constructor(
    private store: Store<fromVideos.VideosPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectVideo(selectedVideoId: any) {
    this.dispatch(videosActions.videoSelected({ selectedVideoId }));
  }

  loadVideos() {
    this.dispatch(videosActions.loadVideos());
  }

  createVideo(video: Video) {
    this.dispatch(videosActions.createVideo({ video }));
  }

  updateVideo(video: Video) {
    this.dispatch(videosActions.updateVideo({ video }));
  }

  deleteVideo(video: Video) {
    this.dispatch(videosActions.deleteVideo({ video }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
