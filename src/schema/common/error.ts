import { z } from "zod";

export const errorResponseSchema = z.object({
	error: z.object({
		message: z.string(),
		details: z.array(z.string()),
	}),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
