import { Body, Controller, Post } from "@nestjs/common";
import { LoggerPipe } from "src/auth/pipes/logger.pipe";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./model/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
        ) {}

    @Post('/signup')
    signUp(@Body(/*LoggerPipe*/) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
