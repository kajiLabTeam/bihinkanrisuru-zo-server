import { OpenAPIHono } from "@hono/zod-openapi";
import { borrowEquipmentHandler } from "~/handlers/equipments/borrowEquipment";
import { createEquipmentHandler } from "~/handlers/equipments/createEquipment";
import { deleteEquipmentHandler } from "~/handlers/equipments/deleteEquipment";
import { getEquipmentsHandler } from "~/handlers/equipments/getEquipments";
import { putEquipmentHandler } from "~/handlers/equipments/putEquipment";
import { returnEquipmentHandler } from "~/handlers/equipments/returnEquipment";
import {
	borrowEquipmentRoute,
	createEquipmentRoute,
	deleteEquipmentsRoute,
	getEquipmentsRoute,
	putEquipmentsRoute,
	returnEquipmentRoute,
} from "./equipments";

export const equipmentRouter = new OpenAPIHono();

equipmentRouter.openapi(getEquipmentsRoute, getEquipmentsHandler);
equipmentRouter.openapi(createEquipmentRoute, createEquipmentHandler);
equipmentRouter.openapi(putEquipmentsRoute, putEquipmentHandler);
equipmentRouter.openapi(borrowEquipmentRoute, borrowEquipmentHandler);
equipmentRouter.openapi(returnEquipmentRoute, returnEquipmentHandler);
equipmentRouter.openapi(deleteEquipmentsRoute, deleteEquipmentHandler);
