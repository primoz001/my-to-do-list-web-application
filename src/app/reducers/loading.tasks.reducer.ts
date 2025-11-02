import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as loadingTasksActions from './loading.tasks.reducer.actions';
import { Task } from '../models/main-models';

export interface LoadingTasksState {
  isLoading: boolean;
  tasks: Task[];
  selectedTask: Task | null;
  error: string | null;
}

const initialState: LoadingTasksState = {
  isLoading: false,
  tasks: [],
  selectedTask: null,
  error: null,
};

export const loadingTasksReducer = createReducer(
  initialState,
  on(loadingTasksActions.getTasks, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadingTasksActions.addTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(loadingTasksActions.removeTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(loadingTasksActions.completeTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(loadingTasksActions.getTasksSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    tasks: payload,
  })),
  on(loadingTasksActions.getTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);

export const getTasksLoadingState = createFeatureSelector<LoadingTasksState>('loadingTasks');

export const getIsLoadingTasks = createSelector(
  getTasksLoadingState,
  (state: LoadingTasksState) => state.isLoading
);

export const getIsLoadingTasksSuccess = createSelector(
  getTasksLoadingState,
  (state: LoadingTasksState) => state.tasks
);

export const getIsLoadingTasksFailure = createSelector(
  getTasksLoadingState,
  (state: LoadingTasksState) => state.error
);

export const getSelectedTask = createSelector(
  getTasksLoadingState,
  (state: LoadingTasksState) => state.selectedTask
);
