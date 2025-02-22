import type { RouteHandler } from "@hono/zod-openapi";

import type { Context } from "hono";
import {
	type createEquipmentRoute,
	getEquipmentsRoute,
} from "~/routers/equipments";
import {
	type CreateEquipmentResponse,
	createEquipmentRequestSchema,
} from "~/schema/equipment";
import { validateRequestBody } from "~/utils/validateRequestBody";

export const createEquipmentHandler: RouteHandler<
	typeof createEquipmentRoute
> = async (c: Context) => {
	const validationResult = await validateRequestBody(
		c,
		createEquipmentRequestSchema,
	);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const requestData = validationResult.data;

	const response: CreateEquipmentResponse = {
		asset_id: requestData.asset_id,
		name: requestData.name,
		purchase_date: requestData.purchase_date,
		place: requestData.place,
		tags: requestData.tags,
	};

	return c.json(response, 201);
};
