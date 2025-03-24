import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { insertUser } from "~/models/user";
import type { createUserRoute } from "~/routers/users/route";
import { createUserRequestSchema } from "~/schema/user";

import { validateRequestBody } from "~/utils/validateRequestBody";

export const createUserHandler: RouteHandler<typeof createUserRoute> = async (
	c: Context,
) => {
	const validationResult = await validateRequestBody(
		c,
		createUserRequestSchema,
	);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const requestData = validationResult.data;

	const userRecord = await insertUser(requestData.id, requestData.name);

	const response = {
		id: userRecord.id,
		name: userRecord.name,
		status: userRecord.status,
	};

	return c.json(response, 201);
};
