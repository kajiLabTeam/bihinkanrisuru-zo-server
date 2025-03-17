import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getTags } from "~/models/tag";
import type { getTagsRoute } from "~/routers/tag/route";
import { type GetTagsResponse, getTagsQuerySchema } from "~/schema/tag";

export const getTagsHandler: RouteHandler<typeof getTagsRoute> = async (
	c: Context,
) => {
	const { name, limit, offset, sort, order } = getTagsQuerySchema.parse(
		c.req.query(),
	);

	const tagRecords = await getTags(name, limit, offset, sort, order);

	return c.json(
		{
			tags: tagRecords.map((tag) => ({
				id: tag.id,
				name: tag.name,
			})),
		} satisfies GetTagsResponse,
		200,
	);
};
