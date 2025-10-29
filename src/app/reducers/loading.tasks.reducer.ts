import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { loadingSuccessful } from './loading.tasks.reducer.actions';
import { Task } from '../models/main-models';

export interface LoadingState {
  loadedTasks: Task[];
}

const initialState: LoadingState = {
  loadedTasks: [],
};

export const loadingReducer = createReducer(
  initialState,
  on(loadingSuccessful, (state, { payload }) => ({
    ...state,
    loadedTasks: payload,
  })),
);

export const getTasksLoadingState = createFeatureSelector<LoadingState>('loading');

export const getLoadedTasks = createSelector(
  getTasksLoadingState,
  (state: LoadingState) => state.loadedTasks
);
