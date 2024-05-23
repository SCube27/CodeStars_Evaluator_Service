import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
    let offset = 0; // this variable tracks the current position in the buffer while parsing
    
    // the output that will contain the accumulated stdout & stderr output as strings
    const output: DockerStreamOutput = { stdout: '', stderr: '' }; 

    // loops until offset reaches end of the buffer
    while(offset < buffer.length) {
        
        // channel is read from buffer and has value of type of stream (stdout / stderr)
        const typeofStream = buffer[offset]; // reads the header first

        // this var holds the length of the value
        // we will read this var on an offset of 4 bytes from the start of chunk
        const length = buffer.readUint32BE(offset+4);

        // as now we've read the header now we can move to the value of chunk
        offset += DOCKER_STREAM_HEADER_SIZE;

        if(typeofStream === 1) {
            // stdout stream
            output.stdout += buffer.toString('utf-8', offset, offset+length);
        } else if(typeofStream === 2) {
            // stderr stream 
            output.stderr += buffer.toString('utf-8', offset, offset+length);
        }

        offset += length; // moving on to next chunk 
    }
    return output;
}

// Basically in a Buffer of 8 byte, 'first 4 bytes' -> type of stream, 'last 4 bytes' -> length of data 