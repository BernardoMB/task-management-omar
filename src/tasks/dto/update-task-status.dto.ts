import { IsEnum } from "class-validator";
import { TaskStatus } from "../model/task.entity";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}