import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Code, Language } from "./code.entity";
import { SubmitCodeDto } from "./dto/submitCode.dto";

export class CodeService {
    constructor(
	@InjectRepository(Code)
	private readonly codeRepository: Repository<Code>
    ) {}

    async submit(submitCodeDto: SubmitCodeDto): Promise<number> {
	return (await this.codeRepository.save(submitCodeDto)).id;
    }

    async findById(id: number) {
	return await this.codeRepository.createQueryBuilder('code')
	    .where({ id })
	    .getOne();
    }

    async findByUser(userId: number) {
	return await this.codeRepository.createQueryBuilder('code')
	    .select(['code.id'])
	    .where({ ownerId: userId })
	    .getMany();
    }

    async filterByLanguage(userId: number, language: Language) {
	return await this.codeRepository.createQueryBuilder('code')
	    .select(['code.id'])
	    .where({ ownerId: userId, language })
	    .getMany();
    }
}
