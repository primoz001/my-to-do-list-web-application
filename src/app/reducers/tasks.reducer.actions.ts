import { props, createAction } from '@ngrx/store';
import { Task } from '../models/main-models';

export const GET_TASK_LIST = '[Tasks] Get task list';
export const ADD_TASK_TO_LIST = '[Tasks] Add task to list';
export const REMOVE_TASK_FROM_LIST = '[Tasks] Remove task from list';
export const COMPLETE_TASK_IN_LIST = '[Tasks] Complete task in list';
export const EDIT_TASK_IN_LIST = '[Tasks] Edit task in list';

export const getTaskList = createAction(
  GET_TASK_LIST,
  props<{ payload: Task[] }>(),
);

export const addTaskToList = createAction(
  ADD_TASK_TO_LIST,
  props<{ payload: Task }>(),
);

export const removeTaskFromList = createAction(
  REMOVE_TASK_FROM_LIST,
  props<{ payload: Task }>(),
);

export const completeTaskInList = createAction(
  COMPLETE_TASK_IN_LIST,
  props<{ payload: Task }>(),
);

export const editTaskInList = createAction(
  EDIT_TASK_IN_LIST,
  props<{ payload: Task }>(),
);
