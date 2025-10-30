import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskForm } from '../../models/main-models';

@Component({
  selector: 'app-task-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-component.html',
  styleUrl: './task-component.scss',
})
export class TaskComponent {
  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
  });
}
