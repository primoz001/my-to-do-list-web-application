import { ActionReducerMap } from '@ngrx/store';

import * as fromLoading from './reducers/loading.tasks.reducer';
import * as fromTask from './reducers/tasks.reducer';

export interface State {
    loading: fromLoading.LoadingState,
    tasks: fromTask.TasksState,
}

export const reducers: ActionReducerMap<State> = {
    loading: fromLoading.loadingReducer,
    tasks: fromTask.tasksReducer
}
