import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Delete,
	Patch,
	Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks') // This will hadnle requests to http://localhost:3000/tasks
export class TasksController {
	constructor(private tasksService: TasksService) {}

	// CRUD (Create, Read, Update, Delete) methods:

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto) {
		return await this.tasksService.createTask(createTaskDto);
	}

	@Get()
	async getAllTasks(@Query() filterDto: GetTasksFilterDto) {
		if (Object.keys(filterDto).length) {
			return await this.tasksService.getTasksWithFilters(filterDto);
		} else {
			return await this.tasksService.getAllTasks();
		}
	}

	@Get('/:id')
	async getTaskById(@Param('id') id: string) {
		return await this.tasksService.getTaskById(id);
	}

	@Patch('/:id/status')
	async updateTaskStatus(
		@Param('id') id: string,
		@Body('status') status: TaskStatus,
	) {
		return await this.tasksService.updateTaskStatus(id, status);
	}

	@Delete('/:id')
	async deleteTask(@Param('id') id: string) {
		return await this.tasksService.deleteTaskById(id);
	}
}
