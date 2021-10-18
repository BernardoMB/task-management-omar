import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './model/task.entity';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './trask.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { User } from 'src/auth/model/user.entity';
import { identity } from 'rxjs';

@Injectable()
export class TasksService {
	
	constructor(
		@InjectRepository(TasksRepository)
		private tasksRepository: TasksRepository
	) {}
	
	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		return this.tasksRepository.getTasks(filterDto, user);
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto, user);
	}

	async getTaskById(taskId: string, user: User): Promise<Task> {
		const found = this.tasksRepository.findOne({ where: { id: taskId, user } });
		if (!found) {
			throw new NotFoundException(`Task with id ${taskId} not found`);
		}
		return found;
	}

	async deleteTaskById(taskId: string, user: User): Promise<Task> {
		const task = await this.getTaskById(taskId, user);
		if (task) {
			const result: DeleteResult = await this.tasksRepository.delete(taskId);
			if (result.affected == 1) {
				return task;
			} else {
				throw new NotFoundException(`Cannot delete task. None or more than one row would be affected.`);
			}
		} else {
			throw new NotFoundException(`Cannot delete task. Task with id ${taskId} not found.`);
		}
	}

	async updateTaskStatus(taskId: string, status: TaskStatus, user: User): Promise<Task> {
		const task = await this.getTaskById(taskId, user);
		task.status = status;
		await this.tasksRepository.save(task);
		return task;
	}
}
