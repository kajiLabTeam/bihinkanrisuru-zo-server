import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { deleteEquipmentById, getEquipmentById } from "~/models/equipment";
import type { deleteEquipmentRoute } from "~/routers/equipments/route";
import type { ErrorResponse } from "~/schema/common/error";
import type { StatusMessageResponse } from "~/schema/common/message";
import { equipmentPathParamsSchema } from "~/schema/equipment";

export const deleteEquipmentHandler: RouteHandler<
	typeof deleteEquipmentRoute
> = async (c: Context) => {
	const equipmentId = equipmentPathParamsSchema.parse(c.req.param()).id;

	const equipmentRecord = await getEquipmentById(equipmentId);
	if (!equipmentRecord) {
		return c.json(
			{
				error: {
					message: "Equipment not found",
					details: [],
				},
			} satisfies ErrorResponse,
			404,
		);
	}

	const _equipment = await deleteEquipmentById(equipmentId);

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
