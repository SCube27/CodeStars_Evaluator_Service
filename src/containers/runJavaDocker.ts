// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

async function runJava(code: string, inputTestCase: string) {
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

    const response = await new Promise((resolve) => {
        loggerStream.on('end', () => {
            const completeBuffer = Buffer.concat(rawLogBuffer); // add all chunks from stream to buffer array
            const decodedStream = decodeDockerStream(completeBuffer); // decode the buffer data to string format
            console.log(decodedStream);
            resolve(decodedStream);
        });
    });

    // remove the container once the process is done
    await javaDockerContainer.remove();
    return response;
}

export default runJava;