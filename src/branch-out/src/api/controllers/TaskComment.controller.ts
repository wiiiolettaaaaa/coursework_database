import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TaskCommentService } from '../services/TaskComment.service';
import { TaskCommentByIdPipe } from '../pipes/TaskCommentById.pipe';
import { CreateTaskCommentDto } from '../dtos/CreateTaskComment.dto';
import { UpdateTaskCommentDto } from '../dtos/UpdateTaskComment.dto';
import { TaskCommentBodyPipe } from '../pipes/TaskCommentBody.pipe';

@ApiTags('TaskComment')
@Controller('/task-comments')
export class TaskCommentController {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  @ApiOperation({ summary: 'Get all task comments' })
  @ApiOkResponse({ description: 'List of all task comments' })
  @Get()
  getAll() {
    return this.taskCommentService.getAll();
  }

  @ApiOperation({ summary: 'Get task comment by ID' })
  @ApiOkResponse({ description: 'Task comment details' })
  @ApiBadRequestResponse({ description: 'Task comment not found' })
  @ApiParam({ name: 'id', description: 'ID of the task comment' })
  @Get('/:id')
  get(@Param('id', TaskCommentByIdPipe) id: string) {
    return this.taskCommentService.getById(id);
  }

  @ApiOperation({ summary: 'Create a task comment' })
  @ApiOkResponse({ description: 'Task comment created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  @Post()
  create(@Body(TaskCommentBodyPipe) body: CreateTaskCommentDto) {
    return this.taskCommentService.create(body);
  }

  @ApiOperation({ summary: 'Update task comment by ID' })
  @ApiOkResponse({ description: 'Task comment updated successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid request data or task comment not found',
  })
  @ApiParam({ name: 'id', description: 'ID of the task comment' })
  @Patch('/:id')
  update(
    @Param('id', TaskCommentByIdPipe) id: string,
    @Body(TaskCommentBodyPipe) body: UpdateTaskCommentDto,
  ) {
    return this.taskCommentService.updateById(id, body);
  }

  @ApiOperation({ summary: 'Delete task comment by ID' })
  @ApiOkResponse({ description: 'Task comment deleted successfully' })
  @ApiBadRequestResponse({ description: 'Task comment not found' })
  @ApiParam({ name: 'id', description: 'ID of the task comment' })
  @Delete('/:id')
  delete(@Param('id', TaskCommentByIdPipe) id: string) {
    return this.taskCommentService.deleteById(id);
  }
}
