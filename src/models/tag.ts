import { Tag } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getTags = async (): Promise<Tag[]> => {
    //タグ全件取得
    const tags = await prismaClient.tag.findMany();
    return tags;
};

export const createTag = async (name: string): Promise<Tag> => {
    //新規タグ追加
    const newTag = await prismaClient.tag.create({
        data: {
            name: name
        }
    });
    return newTag;
}