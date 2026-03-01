import { createReducer, on } from '@ngrx/store';
import * as VisitorActions from './visitor.actions';

export interface VisitorState {
  visitorId: string | null;
  welcome: string | null;
  version: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: VisitorState = {
  visitorId: null,
  welcome: null,
  version: null,
  loading: false,
  error: null
};

export const visitorReducer = createReducer(
  initialState,
  on(VisitorActions.loadVisitor, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(VisitorActions.loadVisitorSuccess, (state, { data }) => ({
    ...state,
    visitorId: data.visitorId,
    welcome: data.welcome,
    version: data.version,
    loading: false,
    error: null
  })),
  on(VisitorActions.loadVisitorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
