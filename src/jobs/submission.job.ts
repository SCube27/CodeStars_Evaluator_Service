import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/codeExecutorStrategy";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/executorFactory";

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log("Handler of the Job called");
        console.log(this.payload);
        if(job) {
            const key = Object.keys(this.payload)[0];
            const codeLanguage = this.payload[key].language;
            const code = this.payload[key].code;
            const inputTestCase = this.payload[key].inputCase;
 
            const strategy = createExecutor(codeLanguage);

            if(strategy !== null) {
                const response: ExecutionResponse = await strategy.execute(code, inputTestCase);
                if(response.status === "COMPLETED") {
                    console.log("Code Executed Successfully");
                    console.log(response);
                } else {
                    console.log("Something went wrong with the response!");
                    console.log(response);
                }
            }
        }
    };

    failed = (job?: Job): void => {
        console.log("Job Failed");
        if(job) {
            console.log(job.id);
        }
    };
}