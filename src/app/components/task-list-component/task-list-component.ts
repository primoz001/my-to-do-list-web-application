import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../services/main-service';
import { Guid } from 'guid-typescript';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-list-component',
  imports: [],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  private mainService = inject(MainService);
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.mainService.addNewTask({
      id: Guid.create().toString(),
      title: 'test',
      description: 'description',
      completed: false
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: ((res) => {
        console.log(res);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  }

}
