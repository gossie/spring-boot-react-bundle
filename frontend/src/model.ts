export enum Status {
    OPEN="OPEN",
    IN_PROGRESS="IN_PROGRESS",
    DONE="DONE"
}
export interface InputField {
    task: string;
    description: string;
}

export interface TaskItem {
    id?: string;
    task: string;
    description: string;
    status: Status;
}

export interface KanbanCardProps {
    task: TaskItem
    onTaskChange: () => void;
}

export interface TaskItemArray {
    results: Array<TaskItem>;
}