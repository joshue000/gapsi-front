import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitorState } from './visitor.reducer';

export const selectVisitorState = createFeatureSelector<VisitorState>('visitor');

export const selectWelcome = createSelector(
  selectVisitorState,
  (state) => state.welcome
);

export const selectVersion = createSelector(
  selectVisitorState,
  (state) => state.version
);

export const selectVisitorId = createSelector(
  selectVisitorState,
  (state) => state.visitorId
);

export const selectLoading = createSelector(
  selectVisitorState,
  (state) => state.loading
);

export const selectVisitorError = createSelector(
  selectVisitorState,
  (state) => state.error
);
