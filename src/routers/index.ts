import { OpenAPIHono } from "@hono/zod-openapi";

import { createEquipmentHandler } from "~/handlers/equipments/createEquipment";
import { deleteEquipmentHandler } from "~/handlers/equipments/deleteEquipment";
import { getEquipmentsHandler } from "~/handlers/equipments/getEquipments";
import { putEquipmentHandler } from "~/handlers/equipments/putEquipment";
import {
	createEquipmentRoute,
	deleteEquipmentsRoute,
	getEquipmentsRoute,
	putEquipmentsRoute,
} from "./equipments";

export const router = new OpenAPIHono();

router
	.openapi(getEquipmentsRoute, getEquipmentsHandler)
	.openapi(createEquipmentRoute, createEquipmentHandler)
	.openapi(putEquipmentsRoute, putEquipmentHandler)
	.openapi(deleteEquipmentsRoute, deleteEquipmentHandler);

router.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "備品管理する蔵API",
	},
});
