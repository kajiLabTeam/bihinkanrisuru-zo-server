import type { Equipment, EquipmentStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "~/lib/prisma";
import { ModelError } from "./errors";

export const getEquipments = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<Equipment[]> => {
	return await prismaClient.equipment.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			[sort]: order,
		},
	});
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
	assetId?: string,
	name?: string,
	place?: string,
	status?: EquipmentStatus,
	purchaseDate?: Date,
): Promise<Equipment> => {
	const updateData: {
		assetId?: string;
		name?: string;
		place?: string;
		status?: EquipmentStatus;
		purchaseDate?: Date;
	} = {};

	if (assetId !== undefined) {
		updateData.assetId = assetId;
	}
	if (name !== undefined) {
		updateData.name = name;
	}
	if (place !== undefined) {
		updateData.place = place;
	}
	if (status !== undefined) {
		updateData.status = status;
	}
	if (purchaseDate !== undefined) {
		updateData.purchaseDate = purchaseDate;
	}

	return await prismaClient.equipment.update({
		where: {
			id,
		},
		data: updateData,
	});
};
