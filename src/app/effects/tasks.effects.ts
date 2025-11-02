import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { MainService } from '../services/main-service';
import * as loadingTasksActions from '../reducers/loading.tasks.reducer.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private mainService = inject(MainService);

  /**
   * Get task list effect with get all tasks action
   */
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingTasksActions.getTasks),
      exhaustMap(() =>
        this.mainService.getTasks().pipe(
          map((tasks) => loadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(loadingTasksActions.getTasksFailure({ error: err.statusText })))
        )
      )
    );
  });

  /**
   * Get task list effect with add new task action
   */
  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingTasksActions.addTask),
      exhaustMap(({ payload }) =>
        this.mainService.addNewTask(payload).pipe(
          map((tasks) => loadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(loadingTasksActions.getTasksFailure({ error: err.statusText })))
        )
      )
    );
  });

  /**
   * Get task list effect with remove task action
   */
  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingTasksActions.removeTask),
      exhaustMap(({ payload }) =>
        this.mainService.removeTask(payload).pipe(
          map((tasks) => loadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(loadingTasksActions.getTasksFailure({ error: err.statusText })))
        )
      )
    );
  });

  /**
   * Get task list effect with mark task as completed action
   */
  completeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingTasksActions.completeTask),
      exhaustMap(({ payload }) =>
        this.mainService.updateTask(payload).pipe(
          map((tasks) => loadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(loadingTasksActions.getTasksFailure({ error: err.statusText })))
        )
      )
    );
  });
}
