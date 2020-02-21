import { createAction, props } from '@ngrx/store';

import { Video } from '@video-manager/core-data';

export const videoSelected = createAction(
  '[VIDEO][SELECTED]',
  props<{ selectedVideoId: string }>()
);
export const loadVideos = createAction(
  '[VIDEO][LOAD]'
);
export const videosLoaded = createAction(
  '[VIDEO][LOADED]',
  props<{ videos: Video[] }>()
);
export const createVideo = createAction(
  '[VIDEO][CREATE]',
  props<{ video: Video }>()
);
export const videoCreated = createAction(
  '[VIDEO][CREATED]',
  props<{ video: Video }>()
);
export const updateVideo = createAction(
  '[VIDEO][UPDATE]',
  props<{ video: Video }>()
);
export const videoUpdated = createAction(
  '[VIDEO][UPDATED]',
  props<{ video: Video }>()
);
export const deleteVideo = createAction(
  '[VIDEO][DELETE]',
  props<{ video: Video }>()
);
export const videoDeleted = createAction(
  '[VIDEO][DELETED]',
  props<{ video: Video }>()
);
