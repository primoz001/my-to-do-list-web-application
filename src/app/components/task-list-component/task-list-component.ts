import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../services/main-service';
import { Guid } from 'guid-typescript';
import { Subject, takeUntil, Observable, catchError, map } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskForm, Task } from '../../models/main-models';
import moment from 'moment';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list-component',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  private mainService = inject(MainService);
  destroy$: Subject<boolean> = new Subject<boolean>();
  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    completed: new FormControl(false, { nonNullable: true }),
  });
  availableTasks$: Observable<Task[]> = this.mainService.getTasks().pipe(
    catchError((err) => {
      throw 'Error in getTasks: ' + err;
    }),
    map((tasks: Task[]) => {
      
      return tasks;
    })
  );

  ngOnInit(): void {}
}
