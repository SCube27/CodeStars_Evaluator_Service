import express from "express";

import serverConfig from "./config/server.config";
import sampleQueueProducer from "./producers/sampleQueue.producer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.worker";

const app = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);

    SampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob', {
        name: 'Sahil Shah',
        company: 'Barclays',
        position: 'Software Engineer',
        location: 'Remote | PUN | MUM'
    });
});