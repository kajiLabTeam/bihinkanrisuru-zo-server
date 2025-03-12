import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateEquipmentById } from "~/models/equipment";
import type { borrowEquipmentRoute } from "~/routers/equipments/route";
import type { StatusMessageResponse } from "~/schema/common/message";
import { borrowEquipmentPathParamsSchema } from "~/schema/equipment";

export const borrowEquipmentHandler: RouteHandler<
	typeof borrowEquipmentRoute
> = async (c: Context) => {
	const equipmentId = borrowEquipmentPathParamsSchema.parse(c.req.param()).id;

	const _equipmentRecord = await updateEquipmentById(equipmentId, {
		status: "BORROWED",
	});

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
