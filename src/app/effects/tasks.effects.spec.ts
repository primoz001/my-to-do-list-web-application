import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TaskEffects } from './tasks.effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MainService } from '../services/main-service';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { reducers } from '../app.reducer';
import { Task } from '../models/main-models';
import { provideHttpClient } from '@angular/common/http';
import * as loadingTasksActions from '../reducers/loading.tasks.reducer.actions';

describe('TaskEffects', () => {
  let effects: TaskEffects;
  let mainService: MainService;
  let actions$ = new Observable<Action>();
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
      providers: [
        provideHttpClient(),
        provideMockActions(() => actions$),
        MainService,
        provideEffects(TaskEffects),
        provideStore(reducers),
      ],
    });
    effects = TestBed.inject(TaskEffects);
    mainService = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTasks$', () => {
    it('should return task list in case of success', (done) => {
      actions$ = of({ type: loadingTasksActions.LOADING_TASK_LIST });
      spyOn(mainService, 'getTasks').and.returnValue(of(mockTasks));
      effects.loadTasks$.subscribe((action) => {
        expect(action).toEqual({
          type: loadingTasksActions.LOADING_TASK_LIST_SUCCESS,
          payload: mockTasks,
        });
        done();
      });
    });
  });
  describe('addTask$', () => {
    it('should return task list with new added task in case of success', (done) => {
      actions$ = of({ type: loadingTasksActions.LOADING_ADD_TASK });
      const mockTasksAdd = [...mockTasks];
      mockTasksAdd.push({
        id: '1c87c10c-e439-54d4-08f1-25ed0288081f',
        title: 'adasdas',
        description: 'asdasdasd',
        completed: false,
        createdOn: '2025-10-31T18:39:26.604Z',
        updatedOn: '2025-11-01T08:15:31.395Z',
      });
      spyOn(mainService, 'addNewTask').and.returnValue(of(mockTasksAdd));
      effects.addTask$.subscribe((action) => {
        expect(action).toEqual({
          type: loadingTasksActions.LOADING_TASK_LIST_SUCCESS,
          payload: mockTasksAdd,
        });
        done();
      });
    });
  });
  describe('removeTask$', () => {
    it('should return task list with one task removed in case of success', (done) => {
      actions$ = of({ type: loadingTasksActions.LOADING_REMOVE_TASK });
      const mockTasksRemove = [...mockTasks];
      mockTasksRemove.slice(0, 1);
      spyOn(mainService, 'removeTask').and.returnValue(of(mockTasksRemove));
      effects.removeTask$.subscribe((action) => {
        expect(action).toEqual({
          type: loadingTasksActions.LOADING_TASK_LIST_SUCCESS,
          payload: mockTasksRemove,
        });
        done();
      });
    });
  });
    describe('completeTask$', () => {
    it('should return task list with selected task marked as completed in case of success', (done) => {
      actions$ = of({ type: loadingTasksActions.LOADING_COMPLETE_TASK });
      const mockTasksCompleted = [...mockTasks];
      mockTasksCompleted[0].completed = true;
      spyOn(mainService, 'updateTask').and.returnValue(of(mockTasksCompleted));
      effects.completeTask$.subscribe((action) => {
        expect(action).toEqual({
          type: loadingTasksActions.LOADING_TASK_LIST_SUCCESS,
          payload: mockTasksCompleted,
        });
        done();
      });
    });
  });
});
