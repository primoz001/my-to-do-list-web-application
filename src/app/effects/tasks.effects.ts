import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { MainService } from '../services/main-service';
import * as LoadingTasksActions from '../reducers/loading.tasks.reducer.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private mainService = inject(MainService);

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingTasksActions.getTasks),
      exhaustMap(() =>
        this.mainService.getTasks().pipe(
          map((tasks) => LoadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(LoadingTasksActions.getTasksFailure({ error: err.message })))
        )
      )
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingTasksActions.addTask),
      exhaustMap(({ payload }) =>
        this.mainService.addNewTask(payload).pipe(
          map((tasks) => LoadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(LoadingTasksActions.getTasksFailure({ error: err.message })))
        )
      )
    );
  });

  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingTasksActions.removeTask),
      exhaustMap(({ payload }) =>
        this.mainService.removeTask(payload).pipe(
          map((tasks) => LoadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(LoadingTasksActions.getTasksFailure({ error: err.message })))
        )
      )
    );
  });

  completeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingTasksActions.completeTask),
      exhaustMap(({ payload }) =>
        this.mainService.updateTask(payload).pipe(
          map((tasks) => LoadingTasksActions.getTasksSuccess({ payload: tasks })),
          catchError((err) => of(LoadingTasksActions.getTasksFailure({ error: err.message })))
        )
      )
    );
  });
}
