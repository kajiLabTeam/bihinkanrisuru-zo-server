import type { RouteHandler } from "@hono/zod-openapi";

import type { Context } from "hono";
import { insertEquipment } from "~/models/equipment";
import { insertEquipmentTags } from "~/models/equipmentTag";
import { ModelError } from "~/models/errors";
import { getTagsByIds } from "~/models/tag";
import type { createEquipmentRoute } from "~/routers/equipments/route";
import type { ErrorResponse } from "~/schema/common/error";
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

	try {
		const requestData = validationResult.data;

		const tagRecords = await getTagsByIds(requestData.tag_ids);
		const equipmentRecord = await insertEquipment(
			requestData.asset_id,
			requestData.name,
			requestData.place,
			requestData.purchase_at ? new Date(requestData.purchase_at) : undefined,
		);
		await insertEquipmentTags(
			equipmentRecord.id,
			tagRecords.map((tag) => tag.id),
		);

		// TODO: QRコード発行のAPIを呼び出す

		return c.json(
			{
				id: equipmentRecord.id,
				asset_id: equipmentRecord.assetId,
				name: equipmentRecord.name,
				status: equipmentRecord.status,
				place: equipmentRecord.place,
				registration_at: equipmentRecord.createdAt.getTime(),
				purchase_at: equipmentRecord.purchaseDate.getTime(),
				borrower: null,
				tags: tagRecords.map((tag) => ({
					id: tag.id,
					name: tag.name,
				})),
			} satisfies CreateEquipmentResponse,
			201,
		);
	} catch (e) {
		return e instanceof ModelError
			? c.json(
					{
						error: {
							message: "Database Error",
							details: [e.message],
						},
					} satisfies ErrorResponse,
					400,
				)
			: c.json(
					{
						error: { message: "Internal Server Error", details: [] },
					} satisfies ErrorResponse,
					500,
				);
	}
};
