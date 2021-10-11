import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "./model/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepoitory: UsersRepository
    ) {
        super({
            secretOrKey: 'CualquierMamadaXD666',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.usersRepoitory.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}