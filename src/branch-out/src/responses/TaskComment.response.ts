export class TaskCommentResponse {
    id: string;
    content: string;
    taskId: string;

    constructor(partial: Partial<TaskCommentResponse>) {
        Object.assign(this, partial);
    }
}