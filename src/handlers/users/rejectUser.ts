import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateUserById } from "~/models/user";
import type { rejectUserRoute } from "~/routers/users/route";
import type { StatusMessageResponse } from "~/schema/common/message";
import { userPathParamSchema } from "~/schema/user";

export const rejectUserHandler: RouteHandler<typeof rejectUserRoute> = async (
	c: Context,
) => {
	const userId = userPathParamSchema.parse(c.req.param()).id;

	const _userRecord = await updateUserById(userId, {
		status: "REJECTED",
	});

	return c.json({ result: "success" } satisfies StatusMessageResponse, 201);
};
