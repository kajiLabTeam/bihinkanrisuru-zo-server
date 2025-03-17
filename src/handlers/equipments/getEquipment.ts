import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";

import { getEquipmentById } from "~/models/equipment";
import { getLatestEquipmentBorrowLogByEquipmentId } from "~/models/equipmentBorrowLog";
import { getEquipmentTagsByEquipmentId } from "~/models/equipmentTag";
import { getTagsByIds } from "~/models/tag";
import { getUserById } from "~/models/user";
import type { getEquipmentRoute } from "~/routers/equipments/route";
import type { ErrorResponse } from "~/schema/common/error";
import {
	type GetEquipmentResponse,
	equipmentPathParamsSchema,
} from "~/schema/equipment";

export const getEquipmentHandler: RouteHandler<
	typeof getEquipmentRoute
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

	const equipmentTagRecords = await getEquipmentTagsByEquipmentId(
		equipmentRecord.id,
	);
	const tagRecords = await getTagsByIds(
		equipmentTagRecords.map((record) => record.tagId),
	);
	const equipmentBorrowLogRecord =
		await getLatestEquipmentBorrowLogByEquipmentId(equipmentRecord.id);
	const userRecord =
		equipmentBorrowLogRecord && equipmentBorrowLogRecord.returnedAt == null
			? await getUserById(equipmentBorrowLogRecord.userId)
			: null;

	return c.json(
		{
			id: equipmentRecord.id,
			asset_id: equipmentRecord.assetId,
			name: equipmentRecord.name,
			status: equipmentRecord.status,
			place: equipmentRecord.place,
			registration_at: equipmentRecord.createdAt.getTime(),
			purchase_at: equipmentRecord.purchaseDate.getTime(),
			borrower: userRecord
				? {
						id: userRecord.id,
						name: userRecord.name,
						borrowed_at: equipmentBorrowLogRecord!.borrowedAt.getTime(),
					}
				: null,
			tags: tagRecords.map((tag) => ({
				id: tag.id,
				name: tag.name,
			})),
		} satisfies GetEquipmentResponse,
		200,
	);
};
