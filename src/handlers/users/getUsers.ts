import type { RouteHandler } from "@hono/zod-openapi";

import type { Context } from "hono";
import { getUsers } from "~/models/user";
import type { getUsersRoute } from "~/routers/users/users";
import { getAccessJudgmentUrlsQuerySchema } from "~/schema/user";

export const getUsersHandler: RouteHandler<typeof getUsersRoute> = async (
	c: Context,
) => {
	const { id, name, limit, offset, sort, order } =
		getAccessJudgmentUrlsQuerySchema.parse(c.req.query());

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
