import { Module } from '@nestjs/common';
import { ProjectMemberRoleModule } from './modules/ProjectMemberRole.module';
import { TaskCommentModule } from './modules/TaskComment.module';
import { PrismaModule } from './modules/prisma.module';

@Module({
  imports: [PrismaModule, ProjectMemberRoleModule, TaskCommentModule],
})
export class AppModule {}
