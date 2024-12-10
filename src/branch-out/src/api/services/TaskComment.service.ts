import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTaskCommentDto } from '../dtos/CreateTaskComment.dto';
import { UpdateTaskCommentDto } from '../dtos/UpdateTaskComment.dto';

@Injectable()
export class TaskCommentService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.taskComment.findMany();
  }

  getById(id: string) {
    return this.prisma.taskComment.findUnique({ where: { id } });
  }

  create(data: CreateTaskCommentDto) {
    return this.prisma.taskComment.create({ data });
  }

  updateById(id: string, data: UpdateTaskCommentDto) {
    return this.prisma.taskComment.update({ where: { id }, data });
  }

  deleteById(id: string) {
    return this.prisma.taskComment.delete({ where: { id } });
  }
}
