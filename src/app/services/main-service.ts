import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/main-models';
import { ADD_TASK_API_URL, REMOVE_TASK_API_URL } from '../constants/main-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  /**
   * HTTP client
   */
  private httpClient = inject(HttpClient);

  /**
   * Call API to add new task to the list
   * @param task Task
   * @returns Observable<Task>
   */
  addNewTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(ADD_TASK_API_URL, task);
  }

  /**
   * Call API to remove a task from the list
   * @param task Task
   * @returns
   */
  removeTask(task: Task): Observable<Task> {
    const urlEncodedParams = encodeURI(task.id);
    return this.httpClient.patch<Task>(
      REMOVE_TASK_API_URL + urlEncodedParams,
      JSON.stringify(task)
    );
  }
}
