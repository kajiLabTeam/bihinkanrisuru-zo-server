import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { putEquipmentsRoute } from "~/routers/equipments/route";
import type { StatusMessageResponse } from "~/schema/common/message";
import { putEquipmentsRequestSchema } from "~/schema/equipment";
import { validateRequestBody } from "~/utils/validateRequestBody";

export const putEquipmentHandler: RouteHandler<
	typeof putEquipmentsRoute
> = async (c: Context) => {
	const validationResult = await validateRequestBody(
		c,
		putEquipmentsRequestSchema,
	);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const _requestData = validationResult.data;

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
