// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

async function runCpp(code: string, inputTestCase: string) {
    const rawLogBuffer: Buffer[] = [];

    await pullImage(CPP_IMAGE); // Pulling the image if not present
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;

    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh',
        '-c',
        runCommand
    ]);

    // Starting or Booting up the python docker container
    await cppDockerContainer.start();
    console.log('Started the docker container');

    const loggerStream = await cppDockerContainer.logs({
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
    await cppDockerContainer.remove();
    return response;
}

export default runCpp;