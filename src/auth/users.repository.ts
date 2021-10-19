import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./model/user.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    private logger = new Logger('UsersRepository');

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });
        try {
            const saved: User = await this.save(user);
            delete saved.password;
            return saved;
        } catch (error) {
            if (error.code === '23505') {
                const msg = 'Username alredy exists';
                this.logger.error(msg);
                throw new ConflictException(msg);
            } else {
                const msg = 'Unexpected error saving user';
                this.logger.error(msg);
                throw new InternalServerErrorException();
            }
        }
    }
}