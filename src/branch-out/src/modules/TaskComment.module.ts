import { Module } from '@nestjs/common';
import { TaskCommentController } from '../api/controllers/TaskComment.controller';
import { TaskCommentService } from '../api/services/TaskComment.service';
import { TaskCommentByIdPipe } from '../api/pipes/TaskCommentById.pipe';
import { TaskCommentBodyPipe } from '../api/pipes/TaskCommentBody.pipe';

@Module({
    controllers: [TaskCommentController],
    providers: [TaskCommentService, TaskCommentByIdPipe, TaskCommentBodyPipe],
})
export class TaskCommentModule {}