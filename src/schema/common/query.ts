import { z } from "zod";
import { stringToIntWithDefault } from "~/utils/queryParse";

export const getQuerySchema = z.object({
	limit: z.string().optional().transform(stringToIntWithDefault(50)).openapi({
		description: "取得する最大数",
		example: "50",
	}),
	offset: z.string().optional().transform(stringToIntWithDefault(0)).openapi({
		description: "取得するオフセット",
		example: "0",
	}),
	sort: z.string().default("createdAt").openapi({
		description: "ソート順",
		example: "createdAt",
	}),
	order: z.string().default("desc").openapi({
		description: "ソート順",
		example: "desc",
	}),
});
