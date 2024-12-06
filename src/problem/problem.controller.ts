import { Post, Put, Body, Controller, UseGuards, UsePipes, ValidationPipe, Get, Delete, Param, Request } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { CreateProblemDto } from './dto/createProblem.dto';
import { ProblemService } from './problem.service';
import { UpdateProblemDto } from './dto/updateProblem.dto';
import { AdvancedSearchDto } from './dto/advancedSearch.dto';

@ApiTags('Problem')
@Controller('problem')
export class ProblemController {
    constructor(private readonly problemService: ProblemService) {}

    @ApiOperation({ summary: "Add a new problem" })
    @ApiBody({ description: "The problem to add", type: CreateProblemDto })
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse()
    @Post('/new')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    async addNewProblem(@Body() newProblem: CreateProblemDto) {
	return await this.problemService.createProblem(newProblem);
    }

    @ApiOperation({ summary: "Update an existing problem" })
    @ApiBody({ description: "The updated problem", type: UpdateProblemDto })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @Put('/update')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    async updateProblem(@Body() updatedProblem: UpdateProblemDto) {
	return await this.problemService.updateProblem(updatedProblem);
    }

    @ApiOperation({ summary: "Retreive a problem" })
    @ApiParam({ name: 'id', description: 'The problem to fetch', type: Number })
    @ApiOkResponse()
    @Get('/get/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async fetchProblem(@Param('id') id: number) {
	return await this.problemService.findById(id);
    }


    @ApiOperation({ summary: "Perform an advanced search for problems" })
    @ApiBody({ description: "The search options", type: AdvancedSearchDto })
    @ApiOkResponse()
    @Get('/search')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async advancedSearch(@Request() req: any,
			 @Body() searchOptions: AdvancedSearchDto) {
	return await this.problemService.advancedSearch(searchOptions,
							req.user.sub);
    }

    @ApiOperation({ summary: "Delete a problem" })
    @ApiParam({ name: 'id', description: "The problem to delete", type: Number})
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @Delete('/delete/:id')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteProblem(@Param('id') id: number) {
	return await this.problemService.deleteProblem(id);
    }

    
}
