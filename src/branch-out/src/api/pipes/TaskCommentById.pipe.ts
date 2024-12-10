import { Injectable, PipeTransform } from '@nestjs/common';
import { TaskCommentService } from '../services/TaskComment.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskCommentByIdPipe implements PipeTransform {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  async transform(id: string): Promise<string> {
    const taskComment = await this.taskCommentService.getById(id);
    if (!taskComment) {
      throw new NotFoundException('TaskComment not found');
    }
    return taskComment.id;
  }
}
