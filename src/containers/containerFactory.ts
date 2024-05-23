import Docker from 'dockerode';

// function takes the name of image for which container to be turned up and an array of cmd commands over it
async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();

    const container = docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // attaches input streams to the container
        AttachStdout: true, // for output streams 
        AttachStderr: true, // for error streams
        Tty: false,
        OpenStdin: true // keep the input stream open even if no interaction with the container
    });
    return container;
}

export default createContainer;