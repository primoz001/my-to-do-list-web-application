import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/main-models';
import { ADD_TASK_API_URL } from '../constants/main-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private httpClient = inject(HttpClient);

  addNewTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(ADD_TASK_API_URL, JSON.stringify(task));
  }
}
