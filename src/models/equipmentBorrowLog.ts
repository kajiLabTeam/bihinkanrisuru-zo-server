import type { EquipmentBorrowLog } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getEquipmentBorrowLogsByEquipmentId = async (
	equipmentId: string,
): Promise<EquipmentBorrowLog[]> => {
	return await prismaClient.equipmentBorrowLog.findMany({
		where: {
			equipmentId,
		},
	});
};
