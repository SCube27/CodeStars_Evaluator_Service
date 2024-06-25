// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutorStrategy';
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

class JavaExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
        const rawLogBuffer: Buffer[] = [];

        await pullImage(JAVA_IMAGE); // Pulling the image if not present
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;

        const javaDockerContainer = await createContainer(JAVA_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);

        // Starting or Booting up the python docker container
        await javaDockerContainer.start();
        console.log('Started the docker container');

        const loggerStream = await javaDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true, // whether logs are streamed or returned as a string
        });

        // attach events on the stream object to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse: string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);    
            return {output: codeResponse, status: "COMPLETED"};
        } catch (error) {
            return {output: error as string, status: "ERROR"};
        } finally {
            // remove the container once the process is done
            await javaDockerContainer.remove();
        }
    }
    
    fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
        return new Promise((resolve, reject) => {
            loggerStream.on('end', () => {
                const completeBuffer = Buffer.concat(rawLogBuffer); // add all chunks from stream to buffer array
                const decodedStream = decodeDockerStream(completeBuffer); // decode the buffer data to string format
                console.log(decodedStream);
                
                if(decodedStream.stderr) {
                    reject(decodedStream.stderr);
                } else {
                    resolve(decodedStream.stdout);
                }
            });
        });
    }
}


export default JavaExecutor;