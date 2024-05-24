import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import runPython from "./containers/runPythonDocker";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.worker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); 
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
    console.log(`Bullboard live on http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker('SampleQueue');

    const code = `
x = input()
print("value of x is", x)
    `;
    runPython(code, "100");
});