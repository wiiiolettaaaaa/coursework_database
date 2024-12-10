import { Module } from '@nestjs/common';
import { ProjectMemberRoleController } from '../api/controllers/ProjectMemberRole.controller';
import { ProjectMemberRoleService } from '../api/services/ProjectMemberRole.service';
import { ProjectMemberRoleByIdPipe } from '../api/pipes/ProjectMemberRoleById.pipe';
import { ProjectMemberRoleBodyPipe } from '../api/pipes/ProjectMemberRoleBody.pipe';

@Module({
  controllers: [ProjectMemberRoleController],
  providers: [
    ProjectMemberRoleService,
    ProjectMemberRoleByIdPipe,
    ProjectMemberRoleBodyPipe,
  ],
})
export class ProjectMemberRoleModule {}
