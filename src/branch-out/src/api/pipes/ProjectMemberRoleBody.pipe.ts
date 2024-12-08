import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../exceptions/InvalidEntityID.exception';
import { PrismaService } from '../../database/prisma.service';
import { UpdateProjectMemberRoleDto } from '../dtos/UpdateProjectMemberRole.dto';

@Injectable()
export class ProjectMemberRoleBodyPipe implements PipeTransform {
    constructor(private readonly prisma: PrismaService) {}

    async transform(body: UpdateProjectMemberRoleDto): Promise<any> {
        const user = await this.prisma.role.findUnique({
            where: { id: body.roleId },
        });
        if (!user) throw new InvalidEntityIdException('Role');

        const project = await this.prisma.projectMember.findUnique({
            where: { id: body.projectMemberId },
        });
        if (!project) throw new InvalidEntityIdException('ProjectMember');

        return body;
    }
}