import type { EquipmentTag } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getEquipmentTagsByEquipmentId = async (
	equipmentId: string,
): Promise<EquipmentTag[]> => {
	return await prismaClient.equipmentTag.findMany({
		where: {
			equipmentId,
		},
	});
};

export const insertEquipmentTag = async (
	equipmentId: string,
	tagId: string,
): Promise<EquipmentTag> => {
	return await prismaClient.equipmentTag.create({
		data: {
			equipmentId,
			tagId,
		},
	});
};

export const insertEquipmentTags = async (
	equipmentId: string,
	tagIds: string[],
): Promise<void> => {
	const equipmentTags = tagIds.map((tagId) => ({
		equipmentId,
		tagId,
	}));

	await prismaClient.equipmentTag.createMany({
		data: equipmentTags,
	});
};

export const deleteEquipmentTag = async (
	equipmentId: string,
	tagId: string,
): Promise<EquipmentTag> => {
	return await prismaClient.equipmentTag.delete({
		where: {
			equipmentId_tagId: {
				equipmentId,
				tagId,
			},
		},
	});
};
