import { Job } from "bullmq";

export interface IJob { // Interface Job (Basic structure for a Job)
    name: string
    payload?: Record<string, undefined> // Optional parameter (Object = (keys[string] : values[undefined] ))
    handle?: (job?: Job) => void // expects an argument of type BullMQ Job and return type as void
    failed?: (job?: Job) => void 
}

// Here is the structure of the Job is as follows 
// 1. Name
// 2. Payload (Data of the Job) this is optional
// 3. handle => Handler Function(Consumer) that picks the job from the queue and processes it
// 4. failed => Failed Function that executes if the job is failed 