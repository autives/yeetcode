import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Submission } from "./submission.entity";

@Injectable()
export class SubmissionRepository {
    constructor(
	@InjectRepository(Submission)
	private readonly submissionRepository: Repository<Submission>,
    ) {}
    
    async save(submission: Partial<Submission>): Promise<Submission> {
	return await this.submissionRepository.save(submission);
    }
    
    async findById(id: number): Promise<Submission | null> {
	return await this.submissionRepository.createQueryBuilder()
	    .where({ id })
	    .getOne();
    }
    
    async findByUser(userId: number): Promise<Submission[]> {
	return await this.submissionRepository.createQueryBuilder('submission')
	    .select(['submission.id'])
	    .where({ ownerId: userId })
	    .getMany();
    }
    
    async filterByLanguage(userId: number, language: string): Promise<Submission[]> {
	return await this.submissionRepository.createQueryBuilder('submission')
	.select(['submission.id'])
	.where({ ownerId: userId, language })
	    .getMany();
    }
    
    async update(id: number, updateValues: Partial<Submission>): Promise<number> {
	const res = await this.submissionRepository.createQueryBuilder()
	    .update()
	    .set(updateValues)
	    .where({ id })
	    .execute();

	return res.affected || 0;
    }
}
