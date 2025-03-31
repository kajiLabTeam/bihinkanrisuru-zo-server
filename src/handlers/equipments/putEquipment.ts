import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { updateEquipmentById } from "~/models/equipment";
import { insertEquipmentTags } from "~/models/equipmentTag";
import type { putEquipmentsRoute } from "~/routers/equipments/route";
import type { StatusMessageResponse } from "~/schema/common/message";
import { putEquipmentsRequestSchema } from "~/schema/equipment";
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
	// tagId更新
	const _editTags = await insertEquipmentTags(
		equipmentId,
		validationResult.data.tag_ids,
	);
	//備品情報の更新
	const _requestData = await updateEquipmentById(
		equipmentId,
		validationResult.data,
	);

	return c.json(
		{
			result: "success",
		} satisfies StatusMessageResponse,
		201,
	);
};
