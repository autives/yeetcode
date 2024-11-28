import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { randomBytes, pbkdf2 } from 'crypto';
import { UserData } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);
    
    constructor(
	@InjectRepository(User)
	private readonly userRepository: Repository<User>
    ) {};

    async findOne(username: string) {
	return await this.userRepository.findOne({
	    where: [{ username }]
	});
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserData> {
	const { username, name, password } = createUserDto;

	const user = this.userRepository.findOne({
	    where: [{ username }]
	});
	if(!user) {
	    throw new HttpException(
		{message: `Username ${username} is already taken.`},
		HttpStatus.BAD_REQUEST
	    )
	}

	const salt = randomBytes(16);
        const hashedPassword = await new Promise<Buffer>((resolve, reject) => {
            pbkdf2(password, salt, 65000, 32, "sha256", (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey);
            });
        });

	const newUser = new User();
	newUser.name = name;
	newUser.username = username;
	newUser.password = hashedPassword;
	newUser.salt = salt;

	const savedUser = await this.userRepository.save(newUser);
	this.logger.log(`Created new user id: ${savedUser.id}, username: ${savedUser.username}`);
	
	return {
	    id: savedUser.id,
	    username: savedUser.username,
	    name: savedUser.name
	}
    }
}
