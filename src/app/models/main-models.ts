import { FormControl } from "@angular/forms";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdOn: string;
    updatedOn: string;
};

export interface TaskForm {
    title: FormControl<string>;
    description: FormControl<string>;
};

export interface CompletedTaskForm {
    completed: FormControl<boolean>;
};
