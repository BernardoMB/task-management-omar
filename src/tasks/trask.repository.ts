import { InternalServerErrorException, Logger } from "@nestjs/common";
import { use } from "passport";
import { User } from "src/auth/model/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task, TaskStatus } from "./model/task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user })
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` }
            )
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            const msg = `Failed to get tasks for user "${user.username}". Filtros: ${JSON.stringify(filterDto)}`;
            this.logger.error(msg, error.stack);
            throw new InternalServerErrorException(msg);
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });
        await this.save(task);
        return task;
    }
}