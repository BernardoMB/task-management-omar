import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Array<Task> = [
        {
            id: '1',
            title: 'Haz la tarea',
            description: 'Tarea de computacion',
            status: TaskStatus.OPEN
        }
    ];
    async getAllTasks(): Promise<Array<Task>> {
        return this.tasks;
    }
}
