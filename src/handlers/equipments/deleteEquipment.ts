import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { deleteEquipmentsRoute } from "~/routers/equipments/route";

export const deleteEquipmentHandler: RouteHandler<
	typeof deleteEquipmentsRoute
> = async (c: Context) => {
	return c.body(null, 204);
};
