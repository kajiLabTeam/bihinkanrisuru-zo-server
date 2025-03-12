import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateEquipmentById } from "~/models/equipment";
import type { returnEquipmentRoute } from "~/routers/equipments/equipments";
import type { StatusMessageResponse } from "~/schema/common/message";
import { returnEquipmentPathParamsSchema } from "~/schema/equipment";

export const returnEquipmentHandler: RouteHandler<
	typeof returnEquipmentRoute
> = async (c: Context) => {
	const equipmentId = returnEquipmentPathParamsSchema.parse(c.req.param()).id;

	const _equipmentRecord = await updateEquipmentById(equipmentId, {
		status: "AVAILABLE",
	});

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
