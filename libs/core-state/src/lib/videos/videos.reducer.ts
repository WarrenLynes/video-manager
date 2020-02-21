import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as videosActions from './videos.actions';
import { Video } from '@video-manager/core-data';

export const VIDEOS_FEATURE_KEY = 'videos';

export interface VideosState extends EntityState<Video> {
  selectedVideoId?: string | number;
  isLoading: boolean;
}

export interface VideosPartialState {
  readonly [VIDEOS_FEATURE_KEY]: VideosState;
}

export const videosAdapter: EntityAdapter<Video> = createEntityAdapter<Video>();

export const initialState: VideosState = videosAdapter.getInitialState({
  selectedVideoId: null,
  isLoading: false
});

const videosReducer = createReducer(
  initialState,
  on(videosActions.videoSelected, (state, { selectedVideoId }) =>
    Object.assign({}, state, { selectedVideoId })
  ),
  on(videosActions.videosLoaded, (state, { videos }) =>
    videosAdapter.addAll(videos, { ...state, isLoading: false })
  ),
  on(videosActions.videoCreated, (state, { video }) =>
    videosAdapter.addOne(video, { ...state, isLoading: false })
  ),
  on(videosActions.videoUpdated, (state, { video }) =>
    videosAdapter.upsertOne(video, { ...state, isLoading: false })
  ),
  on(videosActions.videoDeleted, (state, { video }) =>
    videosAdapter.removeOne(video.id, { ...state, isLoading: false })
  ),
  on(
    videosActions.loadVideos,
    videosActions.createVideo,
    videosActions.updateVideo,
    videosActions.deleteVideo,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: VideosState | undefined, action: Action) {
  return videosReducer(state, action);
}
