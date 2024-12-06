import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { ProblemRepository } from './problem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './problem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Problem])],
    providers: [ProblemService, ProblemRepository],
    controllers: [ProblemController]
})
export class ProblemModule {}
