import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list-component';
import * as fromLoadingTasks from '../../reducers/loading.tasks.reducer';
import { Task } from '../../models/main-models';
import { Store } from '@ngrx/store';
import * as loadingTasksActions from '../../reducers/loading.tasks.reducer.actions';
import { reducers } from '../../app.reducer';
import { provideStore } from '@ngrx/store';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: Store<fromLoadingTasks.LoadingTasksState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [Store<fromLoadingTasks.LoadingTasksState>, provideStore(reducers)],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    store = TestBed.inject(Store<fromLoadingTasks.LoadingTasksState>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddTask', () => {
    it('new task should be added in store selected task', () => {
      const newTask: Task = {
        id: 'f61dab5d-5329-ff58-9102-dfe66f23ce8d',
        title: 'asdasdasd',
        description: 'asdasd',
        completed: false,
        createdOn: '2025-10-31T18:39:14.454Z',
        updatedOn: '2025-10-31T20:15:43.560Z',
      };
      store.dispatch(loadingTasksActions.addTask({ payload: newTask }));
      store.select(fromLoadingTasks.getSelectedTask).subscribe((val) => {
        expect(val).toEqual(newTask);
      });
    });
  });

  describe('onCompleteTask', () => {
    it('correct task should be marked as completed in store selected task', () => {
      const newTask: Task = {
        id: 'f61dab5d-5329-ff58-9102-dfe66f23ce8d',
        title: 'asdasdasd',
        description: 'asdasd',
        completed: true,
        createdOn: '2025-10-31T18:39:14.454Z',
        updatedOn: '2025-10-31T20:15:43.560Z',
      };
      store.dispatch(loadingTasksActions.completeTask({ payload: newTask }));
      store.select(fromLoadingTasks.getSelectedTask).subscribe((val) => {
        expect(val).toEqual(newTask);
      });
    });
  });

  describe('onRemoveTask', () => {
    it('correct task should be selected for removal in store selected task', () => {
      spyOn(component, 'onAddTask').and.callThrough();
      const newTask: Task = {
        id: '4163c607-7179-c9dc-5512-ff4c668766bd',
        title: 'asdasdasd',
        description: 'asdasdasd',
        completed: false,
        createdOn: '2025-10-31T18:39:22.418Z',
        updatedOn: '2025-10-31T20:15:46.199Z',
      };
      store.dispatch(loadingTasksActions.removeTask({ payload: newTask }));
      store.select(fromLoadingTasks.getSelectedTask).subscribe((val) => {
        expect(val).toEqual(newTask);
      });
    });
  });

  describe('isTaskCompleted', () => {
    it('return true if task is marked as completed', () => {
      const newTask: Task = {
        id: '4163c607-7179-c9dc-5512-ff4c668766bd',
        title: 'asdasdasd',
        description: 'asdasdasd',
        completed: true,
        createdOn: '2025-10-31T18:39:22.418Z',
        updatedOn: '2025-10-31T20:15:46.199Z',
      };
      const completed = component.isTaskCompleted(newTask);
      expect(completed).toEqual(newTask.completed);
    });
    it('return false if task is not marked as completed', () => {
      const newTask: Task = {
        id: '4163c607-7179-c9dc-5512-ff4c668766bd',
        title: 'asdasdasd',
        description: 'asdasdasd',
        completed: false,
        createdOn: '2025-10-31T18:39:22.418Z',
        updatedOn: '2025-10-31T20:15:46.199Z',
      };
      const completed = component.isTaskCompleted(newTask);
      expect(completed).toEqual(newTask.completed);
    });
  });
});
