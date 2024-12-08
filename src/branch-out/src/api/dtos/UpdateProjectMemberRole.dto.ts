import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectMemberRoleDto {
    @ApiPropertyOptional({ description: 'Updated Role of the project member role' })
    @IsOptional()
    @IsString({ message: 'Role name must be a string' })
    roleId?: string;

    @ApiPropertyOptional({ description: 'Updated ProjectMember of the project member role' })
    @IsOptional()
    @IsString({ message: 'ProjectMember must be a string' })
    projectMemberId?: string;
}