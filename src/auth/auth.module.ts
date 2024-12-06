import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from "../config/config.module"
import { ConfigService } from '../config/config.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenVerificationService } from './tokenVerification.service';

@Module({
    imports: [
	PassportModule.register({ defaultStrategy: 'jwt' }),
	ConfigModule,
    ],
    providers: [ConfigService, JwtStrategy, JwtAuthGuard, TokenVerificationService],
    exports: [JwtAuthGuard, TokenVerificationService]
})
export class AuthModule {}
