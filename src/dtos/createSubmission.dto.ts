import { z } from "zod";

// export interface CreateSubmissionDto {
//     userId: string,
//     problemId: string,
//     code: string,
//     language: string,
// };

// creating a type out of the below given zod schema
export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;

// creating a zod schema for the incoming dto object
export const createSubmissionSchema = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
}).strict(); // used strict so that no extra parameters comes in
