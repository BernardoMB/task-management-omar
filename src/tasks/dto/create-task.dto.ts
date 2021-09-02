import { IsNotEmpty } from "class-validator";

// Class validator documentation: https://github.com/typestack/class-validator#validation-errors

export class CreateTaskDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	description: string;
}
