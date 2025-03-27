import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";

import { getEquipments } from "~/models/equipment";
import { getLatestEquipmentBorrowLogByEquipmentId } from "~/models/equipmentBorrowLog";
import { getEquipmentTagsByEquipmentId } from "~/models/equipmentTag";
import { getTagsByIds } from "~/models/tag";
import { getUserById } from "~/models/user";
import type { getEquipmentsRoute } from "~/routers/equipments/route";
import {
	type GetEquipmentsResponse,
	getEquipmentsQuerySchema,
} from "~/schema/equipment";

export const getEquipmentsHandler: RouteHandler<
	typeof getEquipmentsRoute
> = async (c: Context) => {
	const { search, limit, offset, sort, order } = getEquipmentsQuerySchema.parse(
		c.req.query(),
	);
	console.log(search, limit, offset, sort, order);

	const response: GetEquipmentsResponse = {
		equipments: [],
	};

	const equipmentRecords = await getEquipments(
		limit,
		offset,
		sort,
		order,
		search,
	);

	console.log(equipmentRecords);

	const equipmentPromises = equipmentRecords.map(async (equipment) => {
		const equipmentTagRecords = await getEquipmentTagsByEquipmentId(
			equipment.id,
		);
		const tagRecords = await getTagsByIds(
			equipmentTagRecords.map((record) => record.tagId),
		);
		const equipmentBorrowLogRecord =
			await getLatestEquipmentBorrowLogByEquipmentId(equipment.id);
		const userRecord =
			equipmentBorrowLogRecord && equipmentBorrowLogRecord.returnedAt == null
				? await getUserById(equipmentBorrowLogRecord.userId)
				: null;

		return {
			id: equipment.id,
			asset_id: equipment.assetId,
			name: equipment.name,
			status: equipment.status,
			place: equipment.place,
			registration_at: equipment.createdAt.getTime(),
			purchase_at: equipment.purchaseDate.getTime(),
			borrower: userRecord
				? {
						id: userRecord.id,
						name: userRecord.name,
						status: userRecord.status,
						borrowed_at: equipmentBorrowLogRecord!.borrowedAt.getTime(),
					}
				: null,
			tags: tagRecords.map((tag) => ({
				id: tag.id,
				name: tag.name,
			})),
		};
	});

	response.equipments = await Promise.all(equipmentPromises);

	return c.json(response, 200);
};
