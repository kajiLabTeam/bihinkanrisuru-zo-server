import { z } from "zod";
import { getQuerySchema } from "./common/query";

export const tagSchema = z.object({
	id: z.string().openapi({ example: "nw45xe6ksp4c8seq8u550lt8" }),
	name: z.string().openapi({ example: "PC" }),
});

export const getTagsQuerySchema = getQuerySchema.merge(
	z.object({
		name: z.string().default("").openapi({
			description: "タグ名",
			example: "PC",
		}),
	}),
);

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
