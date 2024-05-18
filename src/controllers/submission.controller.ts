import { Request, Response } from "express";

import { CreateSubmissionDto } from "../dtos/createSubmission.dto";

export function addSubmission(req: Request, res: Response) {
    const submissionDto = req.body as CreateSubmissionDto;

    // TODO: add validation using ZOD

    return res.status(201).json({
        success: true,
        message: 'Successfully collected the Submission',
        error: {},
        data: submissionDto,
    });
}