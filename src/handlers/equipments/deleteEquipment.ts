import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { deleteEquipmentsRoute } from "~/routers/equipments/equipments";

export const deleteEquipmentHandler: RouteHandler<
	typeof deleteEquipmentsRoute
> = async (c: Context) => {
	return new Response(null, { status: 204 });
};
