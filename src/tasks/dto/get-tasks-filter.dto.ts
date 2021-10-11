import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../model/task.entity";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
	
    @IsOptional()
    @IsString()
    search?: string;
}
