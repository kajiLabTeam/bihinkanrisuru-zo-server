import { z } from "zod";
import { stringToIntWithDefault } from "~/utils/queryParse";

export const tagSchema = z.object({
	id: z.string().openapi({ example: "nw45xe6ksp4c8seq8u550lt8" }),
	name: z.string().openapi({ example: "PC" }),
});

export const getTagsQuerySchema = z.object({
	limit: z.string().optional().transform(stringToIntWithDefault(50)).openapi({
		description: "取得するユーザの最大数",
		example: "50",
	}),
	offset: z.string().optional().transform(stringToIntWithDefault(0)).openapi({
		description: "取得するユーザのオフセット",
		example: "0",
	}),
	sort: z.string().default("createdAt").openapi({
		description: "ユーザのソート順",
		example: "createdAt",
	}),
	order: z.string().default("desc").openapi({
		description: "ユーザのソート順",
		example: "desc",
	}),
});

export const getTagsResponseSchema = z.object({
	tags: z.array(
		tagSchema.openapi({
			description: "タグ情報",
		}),
	),
});

export const createTagRequestSchema = z.object({
	name: z.string().openapi({
		description: "タグ名",
		example: "PC",
	}),
});

export const createTagResponse = tagSchema.openapi({
	description: "タグ情報",
});

export type GetTagsResponse = z.infer<typeof getTagsResponseSchema>;
export type CreateTagRequest = z.infer<typeof createTagRequestSchema>;
export type CreateTagResponse = z.infer<typeof createTagResponse>;
