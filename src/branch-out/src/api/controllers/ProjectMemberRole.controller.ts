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
import { ProjectMemberRoleService } from '../services/ProjectMemberRole.service';
import { ProjectMemberRoleByIdPipe } from '../pipes/ProjectMemberRoleById.pipe';
import { CreateProjectMemberRoleDto } from '../dtos/CreateProjectMemberRole.dto';
import { UpdateProjectMemberRoleDto } from '../dtos/UpdateProjectMemberRole.dto';
import { ProjectMemberRoleBodyPipe } from '../pipes/ProjectMemberRoleBody.pipe';

@ApiTags('ProjectMemberRole')
@Controller('/project-member-roles')
export class ProjectMemberRoleController {
  constructor(
    private readonly projectMemberRoleService: ProjectMemberRoleService,
  ) {}

  @ApiOperation({ summary: 'Get all project member roles' })
  @ApiOkResponse({ description: 'List of all project member roles' })
  @Get()
  getAll() {
    return this.projectMemberRoleService.getAll();
  }

  @ApiOperation({ summary: 'Get project member role by ID' })
  @ApiOkResponse({ description: 'Project member role details' })
  @ApiBadRequestResponse({ description: 'Project member role not found' })
  @ApiParam({ name: 'id', description: 'ID of the project member role' })
  @Get('/:id')
  get(@Param('id', ProjectMemberRoleByIdPipe) id: string) {
    return this.projectMemberRoleService.getById(id);
  }

  @ApiOperation({ summary: 'Create a project member role' })
  @ApiOkResponse({ description: 'Project member role created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  @Post()
  create(@Body(ProjectMemberRoleBodyPipe) body: CreateProjectMemberRoleDto) {
    return this.projectMemberRoleService.create(body);
  }

  @ApiOperation({ summary: 'Update project member role by ID' })
  @ApiOkResponse({ description: 'Project member role updated successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid request data or project member role not found',
  })
  @ApiParam({ name: 'id', description: 'ID of the project member role' })
  @Patch('/:id')
  update(
    @Param('id', ProjectMemberRoleByIdPipe) id: string,
    @Body(ProjectMemberRoleBodyPipe) body: UpdateProjectMemberRoleDto,
  ) {
    return this.projectMemberRoleService.updateById(id, body);
  }

  @ApiOperation({ summary: 'Delete project member role by ID' })
  @ApiOkResponse({ description: 'Project member role deleted successfully' })
  @ApiBadRequestResponse({ description: 'Project member role not found' })
  @ApiParam({ name: 'id', description: 'ID of the project member role' })
  @Delete('/:id')
  delete(@Param('id', ProjectMemberRoleByIdPipe) id: string) {
    return this.projectMemberRoleService.deleteById(id);
  }
}
