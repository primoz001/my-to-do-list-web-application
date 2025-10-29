import { props, createAction } from '@ngrx/store';
import { Task } from '../models/main-models';

export const LOADING_TASK_LIST_SUCCESSFUL = '[Loading] Loading task list successful';
export const LOADING_TASK_LIST_ERROR = '[Loading] Loading task list error';

export const loadingSuccessful = createAction(
  LOADING_TASK_LIST_SUCCESSFUL,
  props<{ payload: Task[] }>(),
);

export const loadingError = createAction(
  LOADING_TASK_LIST_ERROR,
  props<{ error: string }>(),
);
