import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/main-models';
import {
  ADD_TASK_API_URL,
  REMOVE_TASK_API_URL,
  UPDATE_TASK_API_URL,
  GET_TASKS_API_URL,
} from '../constants/main-constants';
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
   * Call API to get list of tasks
   * @returns Observable<Task[]>
   */
  getTasks(): Observable<Task[]> {
    return this.httpClient.post<Task[]>(GET_TASKS_API_URL, {});
  }

  /**
   * Call API to add new task to the list
   * @param task Task
   * @returns Observable<Task[]>
   */
  addNewTask(task: Task): Observable<Task[]> {
    return this.httpClient.post<Task[]>(ADD_TASK_API_URL, task);
  }

  /**
   * Call API to remove task from the list
   * @param task Task
   * @returns Observable<Task[]>
   */
  removeTask(task: Task): Observable<Task[]> {
    const urlEncodedParams = encodeURI(task.id);
    return this.httpClient.put<Task[]>(REMOVE_TASK_API_URL + urlEncodedParams, task);
  }

  /**
   * Call API to update task in the list
   * @param task Task
   * @returns Observable<Task[]>
   */
  updateTask(task: Task): Observable<Task[]> {
    const urlEncodedParams = encodeURI(task.id);
    return this.httpClient.patch<Task[]>(UPDATE_TASK_API_URL + urlEncodedParams, task);
  }
}
