import { OpenAPIHono } from "@hono/zod-openapi";
import { borrowEquipmentHandler } from "~/handlers/equipments/borrowEquipment";
import { createEquipmentHandler } from "~/handlers/equipments/createEquipment";
import { getEquipmentHandler } from "~/handlers/equipments/getEquipment";
import { getEquipmentsHandler } from "~/handlers/equipments/getEquipments";
import { putEquipmentHandler } from "~/handlers/equipments/putEquipment";
import { returnEquipmentHandler } from "~/handlers/equipments/returnEquipment";
import {
	borrowEquipmentRoute,
	createEquipmentRoute,
	getEquipmentRoute,
	getEquipmentsRoute,
	putEquipmentsRoute,
	returnEquipmentRoute,
} from "./route";

export const equipmentRouter = new OpenAPIHono();

equipmentRouter.openapi(getEquipmentRoute, getEquipmentHandler);
equipmentRouter.openapi(getEquipmentsRoute, getEquipmentsHandler);
equipmentRouter.openapi(createEquipmentRoute, createEquipmentHandler);
equipmentRouter.openapi(putEquipmentsRoute, putEquipmentHandler);
equipmentRouter.openapi(borrowEquipmentRoute, borrowEquipmentHandler);
equipmentRouter.openapi(returnEquipmentRoute, returnEquipmentHandler);
