import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { putEquipmentsRoute } from "~/routers/equipments";
import {
	type PutEquipmentsResponse,
	putEquipmentsRequestSchema,
} from "~/schema/equipment";
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

	const requestData = validationResult.data;

	const response: PutEquipmentsResponse = {
		asset_id: requestData.asset_id,
		name: requestData.name,
		purchase_date: requestData.purchase_date,
		place: requestData.place,
	};

	return c.json(requestData, 201);
};
