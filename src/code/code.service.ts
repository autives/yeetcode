import { Injectable } from "@nestjs/common";
import { DockerService } from "../docker/docker.service";
import { SubmissionService } from "../submission/submission.service";
import { FSService } from "../fs/fs.service";
import { languageConfig } from "./language.config";

@Injectable()
export class CodeService {
    constructor(
	private readonly dockerService: DockerService,
	private readonly submissionService: SubmissionService,
	private readonly fsService: FSService
    ) {}

    async run(id: number) {
	const submission = await this.submissionService.findById(id);
	const { ownerId, language, code } = submission;
	
	const directory = `/tmp/yeetcode/user${ownerId.split('|')[1]}/`;
	const tmpFilePath = directory + `code${id}` + languageConfig[language].extension;
	this.fsService.mkdir(directory);
	this.fsService.writeFile(tmpFilePath, code);

	let cmd = ""
	if (languageConfig[language].compiled) {

	    // compilation
	    cmd += languageConfig[language].compiler;
	    cmd += " " + tmpFilePath + " ";
	    cmd += languageConfig[language].outFlag + " " + this.fsService.removeExtension(tmpFilePath);

	    // running
	    cmd += " && "
	    cmd += this.fsService.removeExtension(tmpFilePath);
	    
	} else {
	    cmd += languageConfig[language].runCmd;
	    cmd += " " + tmpFilePath;
	}

	const res = await this.dockerService.run(languageConfig[language].dockerImage,
						 [ cmd ],
						 [ "/tmp:/tmp" ]);
	return res;
    }

}
