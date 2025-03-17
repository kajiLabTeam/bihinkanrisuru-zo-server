import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getAllEquipmentStatuses } from "~/models/equipment";
import type { getEquipmentStatusRoute } from "~/routers/equipments/route";
import type { GetEquipmentStatusResponse } from "~/schema/equipment";

export const getEquipmentStatusHandler: RouteHandler<
	typeof getEquipmentStatusRoute
> = (c: Context) => {
	const equipmentStatus = getAllEquipmentStatuses();

	return c.json(
		{
			status: equipmentStatus,
		} satisfies GetEquipmentStatusResponse,
		200,
	);
};
