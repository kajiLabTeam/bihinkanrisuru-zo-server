import { createRoute } from "@hono/zod-openapi";
import {
	borrowEquipmentPathParamsSchema,
	createEquipmentRequestSchema,
	createEquipmentResponseSchema,
	getEquipmentsResponseSchema,
	putEquipmentsRequestSchema,
	putEquipmentsResponseSchema,
	returnEquipmentPathParamsSchema,
} from "~/schema/equipment";

import { errorResponseSchema } from "~/schema/common/error";
import { statusMessageResponseSchema } from "~/schema/common/message";

export const getEquipmentsRoute = createRoute({
	tags: ["equipments"],
	path: "/",
	method: "get",
	description: "備品一覧を取得 ",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: getEquipmentsResponseSchema,
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

export const createEquipmentRoute = createRoute({
	tags: ["equipments"],
	path: "/",
	method: "post",
	description: "備品登録",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createEquipmentRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: createEquipmentResponseSchema,
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

export const putEquipmentsRoute = createRoute({
	tags: ["equipments"],
	path: "/{equipmentId}",
	method: "put",
	description: "備品編集",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: putEquipmentsRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "OK",
			content: {
				"application/json": {
					schema: putEquipmentsResponseSchema,
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

export const borrowEquipmentRoute = createRoute({
	tags: ["equipments"],
	path: "/{equipmentId}/borrow",
	method: "put",
	description: "備品を借りる",
	request: {
		params: borrowEquipmentPathParamsSchema,
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

export const returnEquipmentRoute = createRoute({
	tags: ["equipments"],
	path: "/{equipmentId}/return",
	method: "put",
	description: "備品を返す",
	request: {
		params: returnEquipmentPathParamsSchema,
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

export const deleteEquipmentsRoute = createRoute({
	tags: ["equipments"],
	path: "/{equipmentId}",
	method: "delete",
	description: "備品削除",
	responses: {
		204: {
			description: "No Content",
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
