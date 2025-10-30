import { props, createAction } from '@ngrx/store';
import { Task } from '../models/main-models';

export const LOADING_TASK_LIST = '[Loading] Get task list';
export const LOADING_ADD_TASK = '[Loading] Add task';
export const LOADING_REMOVE_TASK = '[Loading] Remove task';
export const LOADING_COMPLETE_TASK = '[Loading] Complete task';
export const LOADING_TASK_LIST_SUCCESS = '[Loading] Get task list success';
export const LOADING_TASK_LIST_FAILURE = '[Loading] Get task list failure';

export const getTasks = createAction(
  LOADING_TASK_LIST,
);

export const addTask = createAction(
  LOADING_ADD_TASK,
  props<{ payload: Task }>(),
);

export const removeTask = createAction(
  LOADING_REMOVE_TASK,
  props<{ payload: Task }>(),
);

export const completeTask = createAction(
  LOADING_COMPLETE_TASK,
  props<{ payload: Task }>(),
);

export const getTasksSuccess = createAction(
  LOADING_TASK_LIST_SUCCESS,
  props<{ payload: Task[] }>(),
);

export const getTasksFailure = createAction(
  LOADING_TASK_LIST_FAILURE,
  props<{ error: string }>(),
);
