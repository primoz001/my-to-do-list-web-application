import { Component, inject, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Task } from '../../models/main-models';
import moment from 'moment';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromLoadingTasks from '../../reducers/loading.tasks.reducer';
import * as loadingTasks from '../../reducers/loading.tasks.reducer.actions';

@Component({
  selector: 'app-task-list-component',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  private storeLoadingTasks: Store<fromLoadingTasks.LoadingTasksState> = inject(
    Store<fromLoadingTasks.LoadingTasksState>
  );
  isLoading$: Observable<boolean> = this.storeLoadingTasks.select(fromLoadingTasks.getIsLoadingTasks);
  error$: Observable<string | null> = this.storeLoadingTasks.select(fromLoadingTasks.getIsLoadingTasksFailure);
  tasks$: Observable<Task[]> = this.storeLoadingTasks.select(fromLoadingTasks.getIsLoadingTasksSuccess);


  ngOnInit(): void {
    this.storeLoadingTasks.dispatch(loadingTasks.getTasks());
  }

  onAddTask(): void {
    const newTask: Task = {
        id: Guid.create().toString(),
        title: 'test',
        description: 'description',
        completed: false,
        createdOn: moment().toISOString(),
        updatedOn: moment().toISOString(),
      }
    this.storeLoadingTasks.dispatch(loadingTasks.addTask({payload: newTask}));
  }
}
