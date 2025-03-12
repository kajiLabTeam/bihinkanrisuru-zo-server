import type { Tag } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";
import { ModelError } from "./errors";

export const getTags = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<Tag[]> => {
	return await prismaClient.tag.findMany({
		take: limit,
		skip: offset,
		orderBy: {
			[sort]: order,
		},
	});
};

export const getTagsByIds = async (id: string[]): Promise<Tag[]> => {
	const tags = await prismaClient.tag.findMany({
		where: {
			id: {
				in: id,
			},
		},
	});

	const foundIds = new Set(tags.map((tag) => tag.id));

	const missingIds = id.filter((tagId) => !foundIds.has(tagId));

	if (missingIds.length > 0) {
		throw new ModelError("TagNotFoundError");
	}

	return tags;
};

export const insertTag = async (name: string): Promise<Tag> => {
	return await prismaClient.tag.upsert({
		where: { name },
		update: { name },
		create: { name },
	});
};
