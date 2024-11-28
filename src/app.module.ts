import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';

@Module({
    imports: [UserModule, AuthModule,
	      TypeOrmModule.forRoot({
		  type: databaseConfig.type,
		  host: databaseConfig.host,
		  port: databaseConfig.port,
		  username: databaseConfig.username,
		  password: databaseConfig.password,
		  database: databaseConfig.database,
		  synchronize: true,
		  autoLoadEntities: true,
	      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
