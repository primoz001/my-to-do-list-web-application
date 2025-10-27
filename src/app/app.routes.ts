import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list-component/task-list-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: TaskListComponent,
    }
];
