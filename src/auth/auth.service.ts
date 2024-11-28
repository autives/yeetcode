import { pbkdf2, timingSafeEqual } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/createUser.dto";

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
    
    constructor(
	private readonly userService: UserService,
	private readonly jwtService: JwtService
    ) {};

    async validateUser(username: string, password: string) {
	const user = await this.userService.findOne(username);
	if (!user) return null;

	const hashedPassword = await new Promise<Buffer>((resolve, reject) => {
	    pbkdf2(password, user.salt, 65000, 32, "sha256", (err, derivedKey) => {
		if (err) reject(err);
		resolve(derivedKey);
	    })
	});

	if (timingSafeEqual(Buffer.from(user.password), hashedPassword)) return user;
	return null;
    }

    async login(user: any) {
	const payload = { username: user.username, sub: user.id };

	this.logger.log(`User "${user.username}" logged in.`);
	return {
	    access_token: this.jwtService.sign(payload)
	};
    }

    async register(newUser: CreateUserDto) {
	const createdUser = await this.userService.createUser(newUser);
	const payload = { username: createdUser.username, sub: createdUser.id };
	return {
	    access_token: this.jwtService.sign(payload)
	};
    }
}
