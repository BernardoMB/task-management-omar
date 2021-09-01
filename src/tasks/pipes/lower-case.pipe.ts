import { BadRequestException, PipeTransform } from "@nestjs/common"

export class ToLowerCase implements PipeTransform {
    async transform(value) {
        if (typeof value !== 'string') {
            throw new BadRequestException('Description must be a string');
        }
        return value.toLowerCase();
    }
}