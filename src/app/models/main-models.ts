import { FormControl } from "@angular/forms";
import { Guid } from "guid-typescript";

export interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    dateTime: string,
};

export interface TaskForm {
    title: FormControl<string>,
    description: FormControl<string>,
    completed: FormControl<boolean>,
};
