import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as LoadingTasksActions from './loading.tasks.reducer.actions';
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
  on(LoadingTasksActions.getTasks, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(LoadingTasksActions.addTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(LoadingTasksActions.removeTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(LoadingTasksActions.completeTask, (state, { payload }) => ({
    ...state,
    selectedTask: payload,
    isLoading: true,
  })),
  on(LoadingTasksActions.getTasksSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    tasks: payload,
  })),
  on(LoadingTasksActions.getTasksFailure, (state, { error }) => ({
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
