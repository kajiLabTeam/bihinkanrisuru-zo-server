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

export const getLatestEquipmentBorrowLogByEquipmentId = async (
	equipmentId: string,
): Promise<EquipmentBorrowLog | null> => {
	return await prismaClient.equipmentBorrowLog.findFirst({
		where: {
			equipmentId,
		},
		orderBy: {
			borrowedAt: "desc",
		},
	});
};

export const insertEquipmentBorrowLog = async (
	userId: string,
	equipmentId: string,
): Promise<EquipmentBorrowLog> => {
	return await prismaClient.equipmentBorrowLog.create({
		data: {
			userId,
			equipmentId,
		},
	});
};

export const returnEquipment = async (equipmentId: string) => {
	return await prismaClient.equipmentBorrowLog.updateMany({
		where: {
			equipmentId,
			returnedAt: null,
		},
		data: {
			returnedAt: new Date(),
		},
	});
};
