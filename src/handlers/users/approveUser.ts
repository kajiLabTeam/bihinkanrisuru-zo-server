import type { RouteHandler } from "@hono/zod-openapi";

import type { Context } from "hono";
import { updateUserById } from "~/models/user";
import type { approveUserRoute } from "~/routers/users/users";
import { approveUserPathParamSchema } from "~/schema/user";

export const approveUserHandler: RouteHandler<typeof approveUserRoute> = async (
	c: Context,
) => {
	const userId = approveUserPathParamSchema.parse(c.req.param()).id;

	const userRecord = await updateUserById(userId, undefined, "APPROVED");

	const response = {
		id: userRecord.id,
		name: userRecord.name,
		status: userRecord.status,
	};

	return c.json(response, 201);
};
