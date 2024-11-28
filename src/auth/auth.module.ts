import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
    imports: [
	UserModule,
	PassportModule,
	JwtModule.register({
	    secret: process.env.JWT_SECRET,
	    signOptions: {
		expiresIn: '1h'
	    }
	})
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
