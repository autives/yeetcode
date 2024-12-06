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
	const { username, name, id } = createUserDto;

	const newUser = new User();
	newUser.id = id;
	newUser.name = name;
	newUser.username = username;

	const savedUser = await this.userRepository.save(newUser);
	this.logger.log(`Created new user id: ${savedUser.id}, username: ${savedUser.username}`);
	
	return {
	    id: savedUser.id,
	    username: savedUser.username,
	    name: savedUser.name
	}
    }
}
