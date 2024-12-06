import { Injectable } from '@nestjs/common';
import { ProblemRepository } from './problem.repository';
import { CreateProblemDto } from './dto/createProblem.dto';
import { Problem } from './problem.entity';
import { UpdateProblemDto } from './dto/updateProblem.dto';
import { ProblemTags } from './problem.tags';
import { AdvancedSearchDto } from './dto/advancedSearch.dto.ts~';

@Injectable()
export class ProblemService {
    constructor(private readonly problemRepository: ProblemRepository) {}

    async createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
	return await this.problemRepository.createProblem(createProblemDto);
    }

    async updateProblem(updateProblemDto: UpdateProblemDto) {
	return await this.problemRepository.updateProblem(updateProblemDto);
    }

    async deleteProblem(id: number) {
	return await this.problemRepository.deleteProblem(id);
    }

    async findById(id: number) {
	return await this.problemRepository.findProblemById(id);
    }

    async findByTags(tags: ProblemTags[]) {
	return await this.problemRepository.findProblemsByTags(tags);
    }

    async advancedSearch(searchOptions: AdvancedSearchDto, userId: string) {
	if (searchOptions.solved) {
	    searchOptions = {
		...searchOptions,
		userId
	    }
	}
	
	return await this.problemRepository.advancedSearch(searchOptions);
    }
}
