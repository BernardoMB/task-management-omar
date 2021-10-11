import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./model/user.entity";
import { UsersRepository } from "./users.repository";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.usersRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        if (!user) {
            throw new UnauthorizedException('We couldn\'t find any account with that username')
        }
        const canSignIn = user ? await bcrypt.compare(password, user.password) : false;
        if (canSignIn) {
            const payload: JwtPayload = { username }; // Custom payload
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            //throw new UnauthorizedException('Username or password are incorrect');
            throw new UnauthorizedException('Incorrect password');
        }
    }
}
