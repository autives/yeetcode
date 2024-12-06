import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SubmissionDto } from "./dto/submission.dto";
import { GetSubmissionDto } from "./dto/getSubmission.dto";
import { SubmissionService } from "./submission.service";
import { UpdateSubmissionDto } from "./dto/updateSubmission.dto";

@Controller('submissions')
export class SubmissionController {
    constructor(private readonly codeService: SubmissionService) {}

    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/submit')
    async submitCode(@Body() submissionDto: SubmissionDto) {
	const id = await this.codeService.submit(submissionDto);
	return { codeId: id };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCodeById(@Param('id') id: string) {
	return await this.codeService.findById(parseInt(id));
    }

    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getCodeByUser(@Body() getSubmissionRequest: GetSubmissionDto) {
	if (getSubmissionRequest.language)
	    return await this.codeService.filterByLanguage(getSubmissionRequest.ownerId,
							   getSubmissionRequest.language);
	else
	    return await this.codeService.findByUser(getSubmissionRequest.ownerId);
    }

    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateSubmission(@Body() updateSubmissionDto: UpdateSubmissionDto) {
	return await this.codeService.update(updateSubmissionDto);
    }
}
