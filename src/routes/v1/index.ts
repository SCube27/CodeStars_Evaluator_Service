import express from "express";

import { PingCheck } from "../../controllers/pingController";
import submissionRouter from "./submission.routes";

const v1Router = express.Router();

v1Router.use('/submissions', submissionRouter);

v1Router.get('/ping', PingCheck);

export default v1Router;