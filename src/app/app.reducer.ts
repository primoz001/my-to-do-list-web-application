import { ActionReducerMap } from '@ngrx/store';

import * as fromLoadingTasks from './reducers/loading.tasks.reducer';

export interface State {
    loadingTasks: fromLoadingTasks.LoadingTasksState,
}

export const reducers: ActionReducerMap<State> = {
    loadingTasks: fromLoadingTasks.loadingTasksReducer,
}
