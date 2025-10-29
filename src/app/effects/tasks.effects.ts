import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { MainService } from '../services/main-service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private mainService = inject(MainService);

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Tasks] Get task list'),
      exhaustMap(() => this.mainService.getTasks()
        .pipe(
          map(tasks => ({ type: '[Loading] Loading task list successful', payload: tasks })),
          catchError(() => of({ type: '[Loading] Loading task list error' }))
        )
      )
    );
  });
}