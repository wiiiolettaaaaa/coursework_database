import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskCommentDto {
  @ApiProperty({ description: 'Text of the task comment' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @IsString({ message: 'Text must be a string' })
  text: string;

  @ApiProperty({ description: 'Task ID' })
  @IsNotEmpty({ message: 'Task ID cannot be empty' })
  @IsString({ message: 'Task ID must be a string' })
  taskId: string;

  @ApiProperty({ description: 'Project Member ID' })
  @IsNotEmpty({ message: 'Project Member ID cannot be empty' })
  @IsString({ message: 'Project Member ID must be a string' })
  projectMemberId: string;
}
