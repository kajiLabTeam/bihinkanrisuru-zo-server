import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { editEquipment } from "~/models/equipment";
import { editEquipmenttags } from "~/models/equipmentTag";
import { getTags } from "~/models/tag";
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

	// サーバーエラー
	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	// パスパラメータの取得
	const equipmentId = c.req.param("id");

	const requestData = validationResult.data;
	// Unix時間をDate型に変換
	if (requestData.purchase_date) {
		const editedDate = new Date(requestData.purchase_date * 1000);
	}
	const responceData = editEquipment(equipmentId, requestData.asset_id, requestData.name, editedDate, requestData.place);
	// タグ編集
	const editedTagData = editEquipmenttags;

	const response: PutEquipmentsResponse = {
		asset_id: requestData.asset_id,
		name: requestData.name,
		purchase_date: requestData.purchase_date,
		place: requestData.place,
	};

	// 電波強度の低下
	return c.json(response, 201);
};
