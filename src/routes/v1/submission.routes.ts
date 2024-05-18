import express from "express";

import { addSubmission } from "../../controllers/submission.controller";
import { createSubmissionSchema } from "../../dtos/createSubmission.dto";
import { validate } from "../../validators/createSubmission.validator";

const submissionRouter = express.Router();

// Adding a validation middleware before the controller to check for the valid dto types
submissionRouter.post(
    '/',
    validate(createSubmissionSchema),
    addSubmission
);

export default submissionRouter;