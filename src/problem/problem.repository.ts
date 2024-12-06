import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { Problem } from "./problem.entity";
import { ProblemTags } from "./problem.tags";
import { ProblemDifficulty } from "./problem.difficulty";
import { CreateProblemDto } from "./dto/createProblem.dto";
import { UpdateProblemDto } from "./dto/updateProblem.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AdvancedSearchDto, TagConnective } from "./dto/advancedSearch.dto.ts~";
import { InjectRepository } from "@nestjs/typeorm";
import { paginateQuery } from "../helpers/paginateQuery";

@Injectable()
export class ProblemRepository {
    constructor(
	@InjectRepository(Problem) private readonly repository: Repository<Problem>
    ) {}
    
    async createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
        const problem = this.repository.create(createProblemDto);
        return this.repository.save(problem);
    }

    async findAllProblems(): Promise<Problem[]> {
        return this.repository.find();
    }

    async findProblemById(id: number): Promise<Problem> {
        return this.repository.findOneBy( { id });
    }

    async updateProblem(updateProblemDto: UpdateProblemDto) {
	const { id, ...updateValues } = updateProblemDto;
	
	const res = await this.repository.createQueryBuilder()
	    .update()
	    .set(updateValues)
	    .where({ id: updateProblemDto.id })
	    .execute();

	if (res.affected === 0) throw new HttpException("Problem not found", HttpStatus.NOT_FOUND);
    }

    async deleteProblem(id: number): Promise<void> {
        const problem = await this.repository.findOneBy({ id });
        if (!problem) {
            throw new HttpException("Problem not found", HttpStatus.NOT_FOUND);
        }
        await this.repository.remove(problem);
    }

    async findProblemsByTitle(title: string): Promise<Problem[]> {
        return this.repository.find({ where: { title } });
    }

    async findProblemsByTags(tags: ProblemTags[]): Promise<Problem[]> {
        return this.repository.find({ where: { tags: In(tags) } });
    }

    async findProblemsByDifficulty(difficulty: ProblemDifficulty): Promise<Problem[]> {
        return this.repository.find({ where: { difficulty } });
    }

    async advancedSearch(searchOptions: AdvancedSearchDto) {
	const query = this.repository.createQueryBuilder('problem');

	if (searchOptions.solved && searchOptions.userId) {
	    query.innerJoin('Submission', 'submission', 'problem.id = submission.problemId')
		.andWhere('submission.userId = :userId', { userId: searchOptions.userId });
	}
	
	if (searchOptions.tags && searchOptions.tags.length > 0) {
            if (searchOptions.tagConnective === TagConnective.AND) {
		searchOptions.tags.forEach((tag, index) => {
                    query.andWhere(`:tag${index} = ANY(problem.tags)`, { [`tag${index}`]: tag });
		});
            } else {
		query.andWhere('problem.tags && ARRAY[:...tags]', { tags: searchOptions.tags });
            }
	}

	if (searchOptions.difficulty && searchOptions.difficulty.length > 0) {
            query.andWhere('problem.difficulty IN (:...difficulty)', {
		difficulty: searchOptions.difficulty,
            });
	}

	if (searchOptions.searchText) {
            query.andWhere('problem.title ILIKE :searchText', {
		searchText: `%${searchOptions.searchText}%`,
            });
	    
            if (searchOptions.searchinBody) {
		query.orWhere('problem.description ILIKE :searchText', {
                    searchText: `%${searchOptions.searchText}%`,
		});
            }
	}

	paginateQuery(query, searchOptions);
	
	const problems = await query.getMany();
	return problems;	
    }
}
