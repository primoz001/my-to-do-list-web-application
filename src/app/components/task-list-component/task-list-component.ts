import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../services/main-service';
import { Guid } from 'guid-typescript';
import { Subject, takeUntil, Observable, catchError, map } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskForm, Task } from '../../models/main-models';
import moment from 'moment';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromTasks from '../../reducers/tasks.reducer';
import * as Tasks from '../../reducers/tasks.reducer.actions';

@Component({
  selector: 'app-task-list-component',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  private storeTasks: Store<fromTasks.TasksState> = inject(Store<fromTasks.TasksState>);
  destroy$: Subject<boolean> = new Subject<boolean>();
  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    completed: new FormControl(false, { nonNullable: true }),
  });

  ngOnInit(): void {
    
  }

}
