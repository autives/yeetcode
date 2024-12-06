import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { CodeModule } from './code/code.module';
import { ConfigService } from './config/config.service';
import { ProblemModule } from './problem/problem.module';

@Module({
    imports: [UserModule,
	      AuthModule,
	      CodeModule,
	      ConfigModule,
	      TypeOrmModule.forRootAsync({
		  imports: [ConfigModule],
		  useFactory: async (configService: ConfigService) => ({
		      type: configService.databaseConfig.type,
		      host: configService.databaseConfig.host,
		      port: configService.databaseConfig.port,
		      username: configService.databaseConfig.username,
		      password: configService.databaseConfig.password,
		      database: configService.databaseConfig.database,

		      synchronize: true,
		      autoLoadEntities: true,
		  }),
		  inject: [ConfigService],
	      }),
	      ProblemModule,
	     ],
    controllers: [AppController],
    providers: [AppService,],
})
export class AppModule {}
