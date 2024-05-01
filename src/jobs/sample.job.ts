import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefinition";

export default class SampleJob implements IJob {
    name: string;
    payload?: Record<string, undefined>;
    constructor(payload: Record<string, undefined>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = () => {
        console.log("Handler of the Job called");
    };

    failed = (job?: Job): void => {
        console.log("Job Failed");
        if(job) {
            console.log(job.id);
        }
    };
}