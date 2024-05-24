import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import submissionQueueProducer from "./producers/submissionQueue.producer";
import apiRouter from "./routes";
import { sample_queue, submission_queue } from "./utils/constants";
import SampleWorker from "./workers/sample.worker";
import SubmissionWorker from "./workers/submission.worker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); 
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
    console.log(`Bullboard live on http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker(sample_queue);
    SubmissionWorker(submission_queue);

    const code = `
x = input()
print("value of the x is", x)
    `;

    const inputCase = `100`;

    submissionQueueProducer({ "1234": {
        language: "Python",
        inputCase,
        code
    }});
});