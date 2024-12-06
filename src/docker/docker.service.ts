import * as Docker from "dockerode";
import { Writable } from "stream";

export class DockerService {
    private docker: Docker;

    constructor() {
	this.docker = new Docker();
    }

    async run(image: string, cmd: string[], bindings: string[]) {
	const combined_cmd = cmd.join(" 2>&2 1>&1 && ");
	const Cmd = ["bash", "-c", combined_cmd]
	
	const container = await this.docker.createContainer({
	    Image: image,
	    Cmd,
	    HostConfig: {
		Binds: bindings
	    }
	});

	await container.start();

	let stderr = "";
	let stdout = "";

	const errStream = new Writable({write(chunk, encoding, callback) {
	    stderr += chunk.toString();
	    callback();
	}});
	
	const outStream = new Writable({write(chunk, encoding, callback) {
	    stdout += chunk.toString();
	    callback();
	}});

	const stream = await container.logs({
	    follow: true,
	    stderr: true,
	    stdout: true
	});
	container.modem.demuxStream(stream, outStream, errStream);

	const res = await container.wait();
	await container.remove();
	const success = res.StatusCode === 0;

	return {
	    success,
	    stdout,
	    stderr,
	}
    }

    
}
