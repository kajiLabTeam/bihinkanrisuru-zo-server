import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getEquipmentById, updateEquipmentById } from "~/models/equipment";
import { returnEquipment } from "~/models/equipmentBorrowLog";
import type { returnEquipmentRoute } from "~/routers/equipments/route";
import type { ErrorResponse } from "~/schema/common/error";
import type { StatusMessageResponse } from "~/schema/common/message";
import { equipmentPathParamsSchema } from "~/schema/equipment";

export const returnEquipmentHandler: RouteHandler<
	typeof returnEquipmentRoute
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
	if (equipmentRecord.status !== "BORROWED") {
		return c.json(
			{
				error: {
					message: "Equipment is not borrowed",
					details: [],
				},
			} satisfies ErrorResponse,
			422,
		);
	}

	const _equipmentRecord = await updateEquipmentById(equipmentId, {
		status: "AVAILABLE",
	});
	const _equipmentBorrowRecord = await returnEquipment(equipmentId);

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
