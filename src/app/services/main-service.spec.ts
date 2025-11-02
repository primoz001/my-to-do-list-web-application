import { TestBed } from '@angular/core/testing';

import { MainService } from './main-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/main-models';
import { of } from 'rxjs';
import {
  ADD_TASK_API_URL,
  REMOVE_TASK_API_URL,
  UPDATE_TASK_API_URL,
  GET_TASKS_API_URL,
} from '../constants/main-constants';

describe('MainService', () => {
  let service: MainService;
  let httpClient: HttpClient;

  const mockTasks: Task[] = [
    {
      id: 'f61dab5d-5329-ff58-9102-dfe66f23ce8d',
      title: 'asdasdasd',
      description: 'asdasd',
      completed: false,
      createdOn: '2025-10-31T18:39:14.454Z',
      updatedOn: '2025-10-31T20:15:43.560Z',
    },
    {
      id: '4163c607-7179-c9dc-5512-ff4c668766bd',
      title: 'asdasdasd',
      description: 'asdasdasd',
      completed: false,
      createdOn: '2025-10-31T18:39:22.418Z',
      updatedOn: '2025-10-31T20:15:46.199Z',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(MainService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should call API with correct URL and return correct task list data', () => {
      const httpCall = spyOn(httpClient, 'post').and.returnValue(of(mockTasks));
      service.getTasks().subscribe((val) => {
        expect(val).toEqual(mockTasks);
      });
      expect(httpCall).toHaveBeenCalledWith(GET_TASKS_API_URL, {});
    });
  });
  describe('addNewTask', () => {
    it('should call API with correct URL and return correct task list data with new added task', () => {
      const newTask: Task = {
        id: '1c87c10c-e439-54d4-08f1-25ed0288081f',
        title: 'adasdas',
        description: 'asdasdasd',
        completed: false,
        createdOn: '2025-10-31T18:39:26.604Z',
        updatedOn: '2025-11-01T08:15:31.395Z',
      };
      const newTaskList = [...mockTasks];
      const httpCall = spyOn(httpClient, 'post')
        .withArgs(ADD_TASK_API_URL, newTask)
        .and.returnValue(of(newTaskList));
      service.addNewTask(newTask).subscribe((val) => {
        expect(val).toEqual(newTaskList);
      });
      expect(httpCall).toHaveBeenCalledWith(ADD_TASK_API_URL, newTask);
    });
  });
  describe('removeTask', () => {
    it('should call API with correct URL and return correct task list data with one removed task', () => {
      const removedTaskList = [...mockTasks];
      removedTaskList.slice(0, 1);
      const removedTask = mockTasks[1];
      const urlEncodedParams = encodeURI(mockTasks[1].id);
      const httpCall = spyOn(httpClient, 'put')
        .withArgs(REMOVE_TASK_API_URL + urlEncodedParams, removedTask)
        .and.returnValue(of(removedTaskList));
      service.removeTask(removedTask).subscribe((val) => {
        expect(val).toEqual(removedTaskList);
      });
      expect(httpCall).toHaveBeenCalledWith(REMOVE_TASK_API_URL + urlEncodedParams, removedTask);
    });
  });
  describe('updateTask', () => {
    it('should call API with correct URL and update correct task in the list and return correct updated task list', () => {
      const updatedTaskList = [...mockTasks];
      const updatedTask = updatedTaskList[0];
      updatedTaskList[0].completed = true;
      const urlEncodedParams = encodeURI(updatedTask.id);
      const httpCall = spyOn(httpClient, 'patch')
        .withArgs(UPDATE_TASK_API_URL + urlEncodedParams, updatedTask)
        .and.returnValue(of(updatedTaskList));
      service.updateTask(updatedTask).subscribe((val) => {
        expect(val).toEqual(updatedTaskList);
      });
      expect(httpCall).toHaveBeenCalledWith(UPDATE_TASK_API_URL + urlEncodedParams, updatedTask);
    });
  });
});
