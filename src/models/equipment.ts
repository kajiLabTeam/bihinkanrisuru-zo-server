import { Equipment, EquipmentStatus } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getEquipments = async (): Promise<Equipment[]> => {
  const equipments = await prismaClient.equipment.findMany();
  return equipments;
};

export const editEquipment = async (
  id: string,
  asset_id: string,
  name: string,
  purchase_date: Date,
  place: string,
): Promise<Equipment> => {
  const edited_equipment = await prismaClient.equipment.update({
    where: { id: id },
    data: {
      assetId: asset_id,
      name: name,
      purchaseDate: purchase_date,
      place: place,
    }
  });
  return edited_equipment;
};

export const createEquipment = async (
  asset_id: string,
  name: string,
  status: EquipmentStatus,
  purchase_date: Date,
  place: string,
): Promise<Equipment> => {
  const created_equipment = await prismaClient.equipment.create(
    {
      data: {
        assetId: asset_id,
        name: name,
        status: status,
        purchaseDate: purchase_date,
        place: place,
      }
    }
  );
  return created_equipment;
}

export const deleteEquipment = async (id: string): Promise<Equipment> => {
  const deleted_id = await prismaClient.equipment.delete(
    {
      where: { id: id }
    }
  )
  return deleted_id;
}