import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CodeService } from "./code.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SubmitCodeDto } from "./dto/submitCode.dto";
import { GetCodeDto } from "./dto/getCode.dto";

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) {}

    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/submit')
    async submitCode(@Body() submitCodeBody: SubmitCodeDto) {
	const id = await this.codeService.submit(submitCodeBody);
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
    async getCodeByUser(@Body() getCodeRequest: GetCodeDto) {
	if (getCodeRequest.language)
	    return await this.codeService.filterByLanguage(getCodeRequest.ownerId, getCodeRequest.language);
	else
	    return await this.codeService.findByUser(getCodeRequest.ownerId);
    }
}
