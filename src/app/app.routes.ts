import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list-component/task-list-component';
import { provideState } from '@ngrx/store';
import { tasksReducer } from './reducers/tasks.reducer';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        providers: [provideState('tasks', tasksReducer)],
        component: TaskListComponent,
    }
];
