import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { insertTag } from "~/models/tag";
import type { createTagRoute } from "~/routers/tag/route";
import { type CreateTagResponse, createTagRequestSchema } from "~/schema/tag";

import { validateRequestBody } from "~/utils/validateRequestBody";

export const createTagHandler: RouteHandler<typeof createTagRoute> = async (
	c: Context,
) => {
	const validationResult = await validateRequestBody(c, createTagRequestSchema);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const requestData = validationResult.data;

	const tagRecord = await insertTag(requestData.name);

	return c.json(
		{ id: tagRecord.id, name: tagRecord.name } satisfies CreateTagResponse,
		201,
	);
};
