import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainService } from './services/main-service';
import { takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTasks from './reducers/tasks.reducer';
import * as Tasks from './reducers/tasks.reducer.actions';
import { Task } from './models/main-models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private mainService = inject(MainService);
  private storeTasks: Store<fromTasks.TasksState> = inject(Store<fromTasks.TasksState>);
  destroy$: Subject<boolean> = new Subject<boolean>();

  // ngOnInit(): void {
  //   this.mainService
  //     .getTasks()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (tasks: Task[]) => {
  //         this.storeTasks.dispatch(Tasks.getTaskList({ payload: tasks }));
  //       },
  //       error: (err) => {
  //         console.log('Error at getTasks', err);
  //       },
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.unsubscribe();
  // }
}
