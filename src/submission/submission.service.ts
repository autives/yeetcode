import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { SubmissionRepository } from "./submission.repository";
import { SubmissionDto } from "./dto/submission.dto";
import { UpdateSubmissionDto } from "./dto/updateSubmission.dto";
import { Language } from "./submission.entity";

@Injectable()
export class SubmissionService {
    constructor(private readonly submissionRepository: SubmissionRepository) {}
    
    async submit(submissionDto: SubmissionDto): Promise<number> {
	const savedSubmission = await this.submissionRepository.save(submissionDto);
		return savedSubmission.id;
    }
    
    async findById(id: number) {
	const submission = await this.submissionRepository.findById(id);
	if (!submission) {
	    throw new HttpException("Submission not found", HttpStatus.NOT_FOUND);
	}
	return submission;
    }

    async findByUser(userId: number) {
	return await this.submissionRepository.findByUser(userId);
    }

    async filterByLanguage(userId: number, language: Language) {
	return await this.submissionRepository.filterByLanguage(userId, language);
    }
    
    async update(updateSubmissionDto: UpdateSubmissionDto) {
	const { id, ...updateValues } = updateSubmissionDto;
	if (!updateValues) return;
	
	const affectedRows = await this.submissionRepository.update(id, updateValues);
	if (affectedRows === 0) {
	    throw new HttpException("Submission not found", HttpStatus.NOT_FOUND);
	}
    }
}
