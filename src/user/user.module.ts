import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { createJwksKeyProvider } from '../auth/jwt.keyProvider';
import { AuthModule } from '../auth/auth.module';
import { TokenVerificationService } from '../auth/tokenVerification.service';

@Module({
    imports: [
	AuthModule,
	ConfigModule,
	TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService, JwtService, TokenVerificationService],
    exports: [UserService]
})
export class UserModule {}
