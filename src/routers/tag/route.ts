import { createRoute } from "@hono/zod-openapi";
import { errorResponseSchema } from "~/schema/common/error";
import {
	createTagRequestSchema,
	createTagResponse,
	getTagsQuerySchema,
	getTagsResponseSchema,
} from "~/schema/tag";

export const getTagsRoute = createRoute({
	tags: ["tags"],
	path: "/",
	method: "get",
	description: "タグ一覧を取得 ",
	request: {
		query: getTagsQuerySchema,
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: getTagsResponseSchema,
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
	},
});

export const createTagRoute = createRoute({
	tags: ["tags"],
	path: "/",
	method: "post",
	description: "ユーザ登録",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createTagRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: createTagResponse,
				},
			},
		},
		400: {
			description: "Bad Request",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
	},
});
