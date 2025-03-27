import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateUserById } from "~/models/user";
import type { putUserRoute } from "~/routers/users/route";
import type { StatusMessageResponse } from "~/schema/common/message";
import { putUserRequestSchema, userPathParamSchema } from "~/schema/user";
import { validateRequestBody } from "~/utils/validateRequestBody";

export const putUserHandler: RouteHandler<typeof putUserRoute> = async (
	c: Context,
) => {
	const userId = userPathParamSchema.parse(c.req.param()).id;
	console.log(userId);
	const validationResult = await validateRequestBody(c, putUserRequestSchema);
	console.log(validationResult);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const requestData = validationResult.data;
	const _user = await updateUserById(userId, {
		name: requestData.name,
		status: requestData.status,
	});

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
