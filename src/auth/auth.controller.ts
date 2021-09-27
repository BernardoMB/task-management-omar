import { Body, Controller, Post } from "@nestjs/common";
import { LoggerPipe } from "src/auth/pipes/logger.pipe";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller('auth')
export class AuthController {
    constructor(
        /* private authService: AuthService */
        ) {}

    @Post('/signup')
    signUp(@Body(LoggerPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        //return this.authService.signUp(authCredentialsDto);
        return Promise.resolve();
    }

    /* @Post('/signin')
    signIn(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        //return this.authService.signIn(authCredentialsDto);
        return Promise.resolve({ accessToken: 'token' });
    } */
}
