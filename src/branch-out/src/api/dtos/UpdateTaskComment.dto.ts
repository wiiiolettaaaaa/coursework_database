import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskCommentDto {
    @ApiPropertyOptional({ description: 'Updated text of the task comment' })
    @IsOptional()
    @IsString({ message: 'Text must be a string' })
    text?: string;

    @ApiPropertyOptional({ description: 'Updated task of the task comment' })
    @IsOptional()
    @IsString({ message: 'Task must be a string' })
    taskId?: string;

    @ApiPropertyOptional({ description: 'Updated ProjectMember of the task comment' })
    @IsOptional()
    @IsString({ message: 'ProjectMember must be a string' })
    projectMemberId?: string;
}