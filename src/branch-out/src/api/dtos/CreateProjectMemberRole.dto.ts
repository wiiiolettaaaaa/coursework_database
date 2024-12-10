import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMemberRoleDto {
  @ApiProperty({ description: 'RoleId of the project member role' })
  @IsNotEmpty({ message: 'RoleId name cannot be empty' })
  @IsString({ message: 'RoleId name must be a string' })
  roleId: string;

  @ApiProperty({ description: 'ProjectMemberId of the project member role' })
  @IsNotEmpty({ message: 'ProjectMemberId  cannot be empty' })
  @IsString({ message: 'ProjectMemberId  must be a string' })
  projectMemberId: string;
}
