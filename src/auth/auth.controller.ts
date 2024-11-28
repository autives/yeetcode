import {
    Controller,
    Request,
    UseGuards,
    Post,
    Get,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as Req } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: Req) {
	return this.authService.login(req.user);
    }

    @UsePipes(new ValidationPipe)
    @Post('/register')
    async register(@Body() registerBody: CreateUserDto) {
	return this.authService.register(registerBody);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async profile(@Request() req: Req) {
	return req.user;
    }
}
