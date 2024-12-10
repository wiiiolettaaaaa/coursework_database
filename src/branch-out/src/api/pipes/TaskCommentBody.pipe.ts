import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../exceptions/InvalidEntityID.exception';
import { PrismaService } from '../../database/prisma.service';
import { UpdateTaskCommentDto } from '../dtos/UpdateTaskComment.dto';

@Injectable()
export class TaskCommentBodyPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(body: UpdateTaskCommentDto): Promise<any> {
    const user = await this.prisma.task.findUnique({
      where: { id: body.taskId },
    });
    if (!user) throw new InvalidEntityIdException('Task');

    const project = await this.prisma.projectMember.findUnique({
      where: { id: body.projectMemberId },
    });
    if (!project) throw new InvalidEntityIdException('ProjectMember');

    return body;
  }
}
