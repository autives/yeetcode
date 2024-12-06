import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request as Req } from 'express';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/profile')
    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getHello(@Request() req: Req) {
	return req.user;
    }
}
