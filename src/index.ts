import express from "express";

import serverConfig from "./config/server.config";

const app = express();

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
});