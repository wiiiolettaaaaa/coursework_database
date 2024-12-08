import { Injectable, PipeTransform } from '@nestjs/common';
import { ProjectMemberRoleService } from '../services/ProjectMemberRole.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectMemberRoleByIdPipe implements PipeTransform {
    constructor(private readonly projectMemberRoleService: ProjectMemberRoleService) {}

    async transform(id: string): Promise<string> {
        const role = await this.projectMemberRoleService.getById(id);
        if (!role) {
            throw new NotFoundException('ProjectMemberRole not found');
        }
        return role.id;
    }
}