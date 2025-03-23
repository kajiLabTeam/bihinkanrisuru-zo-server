import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";

import { getUserById } from "~/models/user";
import type { getUserRoute } from "~/routers/users/route";
import type { ErrorResponse } from "~/schema/common/error";
import { type GetUserResponse, userPathParamSchema } from "~/schema/user";

export const getUserHandler: RouteHandler<typeof getUserRoute> = async (
	c: Context,
) => {
	const userId = userPathParamSchema.parse(c.req.param()).id;

	const userRecord = await getUserById(userId);
	if (!userRecord) {
		return c.json(
			{
				error: {
					message: "User not found",
					details: [],
				},
			} satisfies ErrorResponse,
			404,
		);
	}

	return c.json(
		{
			id: userRecord.id,
			name: userRecord.name,
			status: userRecord.status,
		} satisfies GetUserResponse,
		200,
	);
};
