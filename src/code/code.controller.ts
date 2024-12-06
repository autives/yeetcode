import { Controller, UseGuards, Get, Param } from "@nestjs/common";
import { CodeService } from "./code.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) {};
    
    @UseGuards(JwtAuthGuard)
    @Get('/run/:id')
    async run(@Param('id') id: string) {
	return await this.codeService.run(parseInt(id));
    }
}
