import type { RouteHandler } from "@hono/zod-openapi";

import type { Context } from "hono";
import { getUsers } from "~/models/user";
import type { getUsersRoute } from "~/routers/users/users";
import { getUsersQuerySchema } from "~/schema/user";

export const getUsersHandler: RouteHandler<typeof getUsersRoute> = async (
	c: Context,
) => {
	const { limit, offset, sort, order } = getUsersQuerySchema.parse(
		c.req.query(),
	);

	const userRecords = await getUsers(limit, offset, sort, order);

	const response = {
		users: userRecords.map((user) => ({
			id: user.id,
			name: user.name,
			status: user.status,
		})),
	};

	return c.json(response, 200);
};
