import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { getEquipmentsRoute } from "~/routers/equipments/equipments";
import type { GetEquipmentsResponse } from "~/schema/equipment";

export const getEquipmentsHandler: RouteHandler<
	typeof getEquipmentsRoute
> = async (c: Context) => {
	const response: GetEquipmentsResponse = {
		equipments: [
			{
				equipment_id: "af5pgobariolcb44m5xim5zn",
				asset_id: "1234-0000",
				name: "ノートパソコン",
				states: "borrowed",
				borrower: "tada",
				borrowed_date: 1633824000000,
				registration_date: 1633824000000,
				purchase_date: 1633824000000,
				place: "bookshelf-4",
				tags: ["PC", "portable", "essential"],
			},
			{
				equipment_id: "af5pgobariolcb44m5xim5zn",
				asset_id: "1234-0000",
				name: "13万のマスターキー",
				states: "borrowed",
				borrower: "mizutani",
				borrowed_date: 1633824000000,
				registration_date: 1633824000000,
				purchase_date: 1633824000000,
				place: "bookshelf-4",
				tags: [],
			},
		],
	};

	return c.json(response, 200);
};
