import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Delete,
	Patch,
	Query,
	UseGuards,
	Logger
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/model/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './model/task.entity';
import { ToLowerCase } from './pipes/lower-case.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	private logger = new Logger('TaskController');

	constructor(private tasksService: TasksService) {}

	@Post()
	async createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User
	): Promise<Task> {
		this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
		return await this.tasksService.createTask(createTaskDto, user);
	}

	@Get()
	async getTasks(
		@Query() filterDto: GetTasksFilterDto,
		@GetUser() user: User
	) {
		this.logger.verbose(`User "${user.username}" retrieving all tasks. Filter: ${JSON.stringify(filterDto)}`);
		return this.tasksService.getTasks(filterDto, user);
	}

	@Get('/:id')
	async getTaskById(
		@Param('id') id: string,
		@GetUser() user: User
	) {
		this.logger.verbose(`User "${user.username}" getting task with id ${id}`);
		return await this.tasksService.getTaskById(id, user);
	}

	@Patch('/:id/status')
	async updateTaskStatus(
		@Param('id') id: string,
		@Body() updateTaskStatusDto: UpdateTaskStatusDto,
		@GetUser() user: User
	) {
		this.logger.verbose(`User "${user.username}" updating task ${id} with status ${JSON.stringify(updateTaskStatusDto)}`);
		const { status } = updateTaskStatusDto;
		return await this.tasksService.updateTaskStatus(id, status, user);
	}

	@Delete('/:id')
	async deleteTask(
		@Param('id') id: string,
		@GetUser() user: User
	) {
		this.logger.verbose(`User "${user.username}" deleting task with id ${id}`);
		return await this.tasksService.deleteTaskById(id, user);
	}

	@Post('/testCustomPipe')
	async testCustomPipe(
		@Body('description', ToLowerCase) description: string
	) {
		return description;
	}
}
