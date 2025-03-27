import type { User, UserStatus } from "@prisma/client";
import { prismaClient } from "../lib/prisma";

export const getUsers = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	search?: string,
): Promise<User[]> => {
	return await prismaClient.user.findMany({
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

export const getUserById = async (id: string): Promise<User | null> => {
	return await prismaClient.user.findUnique({
		where: {
			id,
		},
	});
};

export const insertUser = async (id: string, name: string): Promise<User> => {
	return await prismaClient.user.upsert({
		where: { id },
		update: { name },
		create: { id, name },
	});
};

export const updateUserById = async (
	id: string,
	updateData: {
		name?: string;
		status?: UserStatus;
	},
): Promise<User> => {
	return await prismaClient.user.update({
		where: {
			id,
		},
		data: updateData,
	});
};
