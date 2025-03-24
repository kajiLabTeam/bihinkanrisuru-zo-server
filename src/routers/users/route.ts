import { createRoute } from "@hono/zod-openapi";
import { errorResponseSchema } from "~/schema/common/error";
import { statusMessageResponseSchema } from "~/schema/common/message";
import {
	createUserRequestSchema,
	createUserResponseSchema,
	getUserResponseSchema,
	getUsersQuerySchema,
	getUsersResponseSchema,
	putUserRequestSchema,
	userPathParamSchema,
} from "~/schema/user";

export const getUserRoute = createRoute({
	tags: ["users"],
	path: "/{id}",
	method: "get",
	description: "ユーザーを取得 ",
	request: {
		query: getUsersQuerySchema,
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: getUserResponseSchema,
				},
			},
		},
		404: {
			description: "Not Found",
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

export const getUsersRoute = createRoute({
	tags: ["users"],
	path: "/",
	method: "get",
	description: "ユーザ一覧を取得 ",
	request: {
		query: getUsersQuerySchema,
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

export const putUserRoute = createRoute({
	tags: ["users"],
	path: "/{id}",
	method: "put",
	description: "備品編集",
	request: {
		params: statusMessageResponseSchema,
		body: {
			required: true,
			content: {
				"application/json": {
					schema: putUserRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: statusMessageResponseSchema,
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
		params: userPathParamSchema,
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: statusMessageResponseSchema,
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
		params: userPathParamSchema,
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: statusMessageResponseSchema,
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
