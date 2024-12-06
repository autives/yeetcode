import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class FSService {
    mkdir(directory: string) {
	fs.mkdirSync(directory, { recursive: true });
    }

    writeFile(file: string, data: string) {
	fs.writeFileSync(file, data);
    }

    removeExtension(filePath: string) {
	const regex = new RegExp(/\.[^/.]+$/);
	return filePath.replace(regex, "");
    }
}
