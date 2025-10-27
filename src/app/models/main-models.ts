import { Guid } from "guid-typescript";

export interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
};
