import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateUserById } from "~/models/user";
import type { rejectUserRoute } from "~/routers/users/users";
import { rejectUserPathParamSchema } from "~/schema/user";

export const rejectUserHandler: RouteHandler<typeof rejectUserRoute> = async (
	c: Context,
) => {
	const userId = rejectUserPathParamSchema.parse(c.req.param()).id;

	const userRecord = await updateUserById(userId, undefined, "REJECTED");

	const response = {
		id: userRecord.id,
		name: userRecord.name,
		status: userRecord.status,
	};

	return c.json(response, 201);
};
