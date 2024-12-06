import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { TokenVerificationService } from "../auth/tokenVerification.service";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(
	private readonly userService: UserService,
	private readonly tokenVerification: TokenVerificationService
    ) {}
    
    @HttpCode(200)
    @Post('create')
    @ApiOperation({ summary: "Add new user to the database" })
    @ApiParam({ name: 'id_token', description: 'The id_token provided by Auth0' })
    @ApiResponse({ status: 200 })
    async createUser(@Body('id_token') token: string) {
	const user = await this.tokenVerification.verifyToken(token);
	const createUserDto = new CreateUserDto();
	createUserDto.name = user.name;
	createUserDto.id = user.sub;
	createUserDto.username = user.nickname;

	await this.userService.createUser(createUserDto);
    }
}
