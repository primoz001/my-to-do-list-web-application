import { Component, inject, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Task } from '../../models/main-models';
import moment from 'moment';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromLoadingTasks from '../../reducers/loading.tasks.reducer';
import * as loadingTasksActions from '../../reducers/loading.tasks.reducer.actions';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AddNewTaskForm } from '../../models/main-models';

@Component({
  selector: 'app-task-list-component',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, CommonModule],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  private storeLoadingTasks: Store<fromLoadingTasks.LoadingTasksState> = inject(
    Store<fromLoadingTasks.LoadingTasksState>
  );
  private fb = inject(FormBuilder);
  addNewTaskForm = this.fb.group<AddNewTaskForm>({
    title: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  isLoading$: Observable<boolean> = this.storeLoadingTasks.select(
    fromLoadingTasks.getIsLoadingTasks
  );
  error$: Observable<string | null> = this.storeLoadingTasks.select(
    fromLoadingTasks.getIsLoadingTasksFailure
  );
  tasks$: Observable<Task[]> = this.storeLoadingTasks.select(
    fromLoadingTasks.getIsLoadingTasksSuccess
  );

  /**
   * Get add new task title FormControl
   */
  get titleForm() {
    return this.addNewTaskForm.get('title');
  }

  /**
   * Get add new task description FormControl
   */
  get descriptionForm() {
    return this.addNewTaskForm.get('description');
  }

  ngOnInit(): void {
    this.storeLoadingTasks.dispatch(loadingTasksActions.getTasks());
  }

  /**
   * Add new task to the list
   */
  onAddTask(): void {
    const newTaskForm = this.addNewTaskForm.getRawValue();
    this.addNewTaskForm.reset();
    const newTask: Task = {
      id: Guid.create().toString(),
      title: newTaskForm?.title,
      description: newTaskForm?.description,
      completed: false,
      createdOn: moment().toISOString(),
      updatedOn: moment().toISOString(),
    };
    this.storeLoadingTasks.dispatch(loadingTasksActions.addTask({ payload: newTask }));
  }

  /**
   * Mark task as completed
   * @param task Task
   */
  onCompleteTask(task: Task): void {
    const updatedTask = { ...task };
    updatedTask.updatedOn = moment().toISOString();
    updatedTask.completed = !task.completed;
    this.storeLoadingTasks.dispatch(loadingTasksActions.completeTask({ payload: updatedTask }));
  }

  /**
   * Remove task from the list
   * @param task Task
   */
  onRemoveTask(task: Task): void {
    this.storeLoadingTasks.dispatch(loadingTasksActions.removeTask({ payload: task }));
  }

  /**
   * Check if task is completed
   * @param task Task
   * @returns boolean
   */
  isTaskCompleted(task: Task): boolean {
    return task.completed;
  }
}
