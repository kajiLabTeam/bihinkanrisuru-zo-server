import type { User, UserStatus } from "@prisma/client";
import { prismaClient } from "../lib/prisma";

export const getUsers = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<User[]> => {
	return await prismaClient.user.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			[sort]: order,
		},
	});
};

export const insertUser = async (id: string, name: string): Promise<User> => {
	return await prismaClient.user.create({
		data: {
			id,
			name,
		},
	});
};

export const updateUserById = async (
	id: string,
	name?: string,
	status?: UserStatus,
): Promise<User> => {
	const updateData: { name?: string; status?: UserStatus } = {};

	if (name !== undefined) {
		updateData.name = name;
	}
	if (status !== undefined) {
		updateData.status = status;
	}

	return await prismaClient.user.update({
		where: {
			id,
		},
		data: updateData,
	});
};
