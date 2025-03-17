import { z } from "zod";

export const statusMessageResponseSchema = z.object({
	result: z.enum(["success", "failure"]).openapi({
		description: "結果",
		example: "success",
	}),
});

export type StatusMessageResponse = z.infer<typeof statusMessageResponseSchema>;
