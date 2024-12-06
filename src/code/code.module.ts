import { Module } from "@nestjs/common";
import { CodeService } from "./code.service";
import { DockerService } from "../docker/docker.service";
import { FSService } from "../fs/fs.service";
import { DockerModule } from "../docker/docker.module";
import { FSModule } from "../fs/fs.module";
import { CodeController } from "./code.controller";
import { SubmissionModule } from "../submission/submission.module";
import { SubmissionService } from "../submission/submission.service";
import { Submission } from "../submission/submission.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Submission]), DockerModule, FSModule, SubmissionModule],
    providers: [CodeService, SubmissionService, DockerService, FSService],
    controllers: [CodeController]
})
export class CodeModule {};
