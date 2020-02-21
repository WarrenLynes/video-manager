import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  VIDEOS_FEATURE_KEY,
  videosAdapter,
  VideosState
} from './videos.reducer';
import { emptyVideo } from '@video-manager/core-data';

export const selectVideosState =
  createFeatureSelector<VideosState>(VIDEOS_FEATURE_KEY);

const { selectAll, selectEntities } = videosAdapter.getSelectors();

export const selectVideosLoading = createSelector(
  selectVideosState,
  (state: VideosState) => state.isLoading
);

export const selectAllVideos = createSelector(
  selectVideosState,
  (state: VideosState) => selectAll(state)
);

export const selectVideosEntities = createSelector(
  selectVideosState,
  (state: VideosState) => selectEntities(state)
);

export const selectVideoId = createSelector(
  selectVideosState,
  (state: VideosState) => state.selectedVideoId
);

export const selectVideo = createSelector(
  selectVideosEntities,
  selectVideoId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyVideo
  }
);
