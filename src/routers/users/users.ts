import { createRoute } from "@hono/zod-openapi";
import { errorResponseSchema } from "~/schema/error";
import {
	approveUserPathParamSchema,
	approveUserResponseSchema,
	createUserRequestSchema,
	createUserResponseSchema,
	getAccessJudgmentUrlsQuerySchema,
	getUsersResponseSchema,
	rejectUserPathParamSchema,
	rejectUserResponseSchema,
} from "~/schema/user";

export const getUsersRoute = createRoute({
	tags: ["users"],
	path: "/",
	method: "get",
	description: "ユーザ一覧を取得 ",
	request: {
		query: getAccessJudgmentUrlsQuerySchema,
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: getUsersResponseSchema,
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

export const createUserRoute = createRoute({
	tags: ["users"],
	path: "/",
	method: "post",
	description: "ユーザ登録",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createUserRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: createUserResponseSchema,
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

export const approveUserRoute = createRoute({
	tags: ["users"],
	path: "/{id}/approve",
	method: "put",
	description: "ユーザを承認",
	request: {
		params: approveUserPathParamSchema,
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: approveUserResponseSchema,
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

export const rejectUserRoute = createRoute({
	tags: ["users"],
	path: "/{id}/reject",
	method: "put",
	description: "ユーザを拒否",
	request: {
		params: rejectUserPathParamSchema,
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: rejectUserResponseSchema,
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
