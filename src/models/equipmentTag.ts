import { EquipmentTag } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const createTags = async (): Promise<EquipmentTag[]> => {
    // 備品情報が新たに登録されたとき、対応するEquipmentTagのレコードを追加
    const tags = await prismaClient.equipmentTag.findMany();
    return tags;
};

export const getEquipmentTags = async (equipmentId: string): Promise<EquipmentTag[]> => {
    // 備品IDが入力された時、該当のタグIDに対応するレコード複数を返す
    const equipmentTagRecords = await prismaClient.equipmentTag.findMany({
        where: { equipmentId: equipmentId }
    });
    return equipmentTagRecords;
}

export const editEquipmenttags = async (): Promise<EquipmentTag> => {
    // 備品情報が更新された時、該当の備品IDのレコードを更新する
    // Todo:mizutanichan
    const editedEquipmentTagRecord;
    return editedEquipmentTagRecord;
}

export const deleteEquipmenttags = async (equipmentId: string) => {
    // 備品情報が削除された時、該当の備品IDのレコードを削除する
    await prismaClient.equipmentTag.deleteMany({
        where: { equipmentId: equipmentId }
    });
}