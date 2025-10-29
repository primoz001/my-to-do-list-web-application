import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getTaskList,
  addTaskToList,
  removeTaskFromList,
  completeTaskInList,
  editTaskInList,
} from './tasks.reducer.actions';
import { Task } from '../models/main-models';

export interface TasksState {
  availableTasks: Task[];
}

const initialState: TasksState = {
  availableTasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(getTaskList, (state, { payload }) => ({
    ...state,
    availableTasks: payload,
  })),
);

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getAvailableTasks = createSelector(
  getTasksState,
  (state: TasksState) => state.availableTasks
);
