import { type Equipment, EquipmentStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "~/lib/prisma";
import { ModelError } from "./errors";

export const getEquipments = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	search?: string,
): Promise<Equipment[]> => {
	return await prismaClient.equipment.findMany({
		take: limit,
		skip: offset,
		where: search
			? {
					OR: [
						{ id: { contains: search, mode: "insensitive" } },
						{ name: { contains: search, mode: "insensitive" } },
					],
				}
			: undefined,
		orderBy: {
			[sort]: order,
		},
	});
};

export const getEquipmentById = async (
	id: string,
): Promise<Equipment | null> => {
	return await prismaClient.equipment.findUnique({
		where: {
			id,
		},
	});
};

export const getAllEquipmentStatuses = (): EquipmentStatus[] => {
	return Object.values(EquipmentStatus);
};

export const insertEquipment = async (
	assetId: string,
	name: string,
	place: string,
	purchaseDate?: Date,
): Promise<Equipment> => {
	try {
		return await prismaClient.equipment.create({
			data: {
				assetId,
				name,
				place,
				purchaseDate,
			},
		});
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
			throw new ModelError("EquipmentNameIsAlreadyUsed");
		}
		throw e;
	}
};

export const updateEquipmentById = async (
	id: string,
	updateData: {
		assetId?: string;
		name?: string;
		place?: string;
		status?: EquipmentStatus;
		purchaseDate?: Date;
	},
): Promise<Equipment> => {
	return await prismaClient.equipment.update({
		where: {
			id,
		},
		data: updateData,
	});
};

export const deleteEquipmentById = async (id: string): Promise<Equipment> => {
	return await prismaClient.equipment.delete({
		where: {
			id,
		},
	});
};
