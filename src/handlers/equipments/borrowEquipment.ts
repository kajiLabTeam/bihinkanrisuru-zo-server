import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getEquipmentById, updateEquipmentById } from "~/models/equipment";
import { insertEquipmentBorrowLog } from "~/models/equipmentBorrowLog";
import type { borrowEquipmentRoute } from "~/routers/equipments/route";
import type { ErrorResponse } from "~/schema/common/error";
import type { StatusMessageResponse } from "~/schema/common/message";
import {
	borrowEquipmentRequestSchema,
	equipmentPathParamsSchema,
} from "~/schema/equipment";
import { validateRequestBody } from "~/utils/validateRequestBody";

export const borrowEquipmentHandler: RouteHandler<
	typeof borrowEquipmentRoute
> = async (c: Context) => {
	const equipmentId = equipmentPathParamsSchema.parse(c.req.param()).id;
	const validationResult = await validateRequestBody(
		c,
		borrowEquipmentRequestSchema,
	);

	if (!validationResult.success) return c.json(validationResult.error, 400);

	const requestData = validationResult.data;

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
	if (equipmentRecord.status !== "AVAILABLE") {
		return c.json(
			{
				error: {
					message: "Equipment is not available",
					details: [],
				},
			} satisfies ErrorResponse,
			422,
		);
	}

	const _equipmentRecord = await updateEquipmentById(equipmentId, {
		status: "BORROWED",
	});
	const _equipmentBorrowRecord = await insertEquipmentBorrowLog(
		requestData.user_id,
		equipmentId,
	);

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
