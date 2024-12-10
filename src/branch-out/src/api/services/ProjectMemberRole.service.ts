import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectMemberRoleDto } from '../dtos/CreateProjectMemberRole.dto';
import { UpdateProjectMemberRoleDto } from '../dtos/UpdateProjectMemberRole.dto';

@Injectable()
export class ProjectMemberRoleService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.projectMemberRole.findMany();
  }

  getById(id: string) {
    return this.prisma.projectMemberRole.findUnique({ where: { id } });
  }

  create(data: CreateProjectMemberRoleDto) {
    return this.prisma.projectMemberRole.create({ data });
  }

  updateById(id: string, data: UpdateProjectMemberRoleDto) {
    return this.prisma.projectMemberRole.update({ where: { id }, data });
  }

  deleteById(id: string) {
    return this.prisma.projectMemberRole.delete({ where: { id } });
  }
}
