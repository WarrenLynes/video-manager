import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromVideos from './videos/videos.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  videos: fromVideos.VideosState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  videos: fromVideos.reducer
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  videos: {ids: [] } as fromVideos.VideosState
};
