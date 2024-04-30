import express from "express";

import { PingCheck } from "../../controllers/pingController";

const v1Router = express.Router();

v1Router.get('/ping', PingCheck);

export default v1Router;