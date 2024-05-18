import express from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import sampleQueueProducer from "./producers/sampleQueue.producer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.worker";

const app = express();

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
    console.log(`Bullboard live on http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob', {
        name: 'Sahil A. Shah',
        company: 'FlytBase',
        position: 'Software Engineer (Backend)',
        location: 'Remote | PUN'
    }, 2);
    
    sampleQueueProducer('SampleJob', {
        name: 'Sahil A. Shah',
        company: 'Barclays',
        position: 'Software Engineer',
        location: 'Remote | PUN | MUM'
    }, 1);
});