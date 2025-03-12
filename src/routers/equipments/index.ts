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

export const equipmentRouter = new OpenAPIHono();

equipmentRouter.openapi(getEquipmentsRoute, getEquipmentsHandler);
equipmentRouter.openapi(createEquipmentRoute, createEquipmentHandler);
equipmentRouter.openapi(putEquipmentsRoute, putEquipmentHandler);
equipmentRouter.openapi(deleteEquipmentsRoute, deleteEquipmentHandler);
