import { BadRequestException, PipeTransform } from "@nestjs/common"

export class LoggerPipe implements PipeTransform {
    async transform(value) {
        console.log('Logger pipe', value);
        return value;
    }
}