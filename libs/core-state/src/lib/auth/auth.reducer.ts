import { Action, createReducer, createSelector, on } from '@ngrx/store';
import {
  authenticateSuccess,
  authenticateFailure,
  reset,
  logout,
  logoutSuccess,
  logoutFailure, authenticate, accessGranted
} from './auth.actions';
import { AppState } from '@video-manager/core-state';

export interface IUser {
  email: string;
  name?: string;
}

export interface IAuthState {
  authenticated: boolean;
  token: string;
  loading: boolean;
  access_token: any;
}

const initialState: IAuthState = {
  token: null,
  authenticated: false,
  loading: false,
  access_token: null
};

const reducer = createReducer(
  initialState,
  on(reset, () => ({ ...initialState })),
  on(authenticate, (state) => ({...state, loading: true})),
  on(accessGranted, (state, {access_token}) => ({...state, access_token})),
  on(authenticateSuccess, (state, {token}) => ({ ...state, token, authenticated: true, loading: false })),
  on(authenticateFailure, () => ({ ...initialState })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, () => ({ ...initialState })),
  on(logoutFailure, () => ({ ...initialState }))
);

export function authReducer(state = initialState, action: Action): IAuthState {
  return reducer(state, action);
}

export const getAuthState = (state: AppState) => state.auth;
export const mapToAuthenticated = (state: IAuthState) => state.authenticated;
export const mapToAccessToken = (state: IAuthState) => state.access_token || null;
export const mapToLoading = (state: IAuthState) => state.loading;
export const authenticated = createSelector(getAuthState, mapToAuthenticated);
export const accessToken = createSelector(getAuthState, mapToAccessToken);
export const loading = createSelector(getAuthState, mapToLoading);

