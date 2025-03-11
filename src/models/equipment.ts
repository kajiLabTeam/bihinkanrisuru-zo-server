import { Equipment, EquipmentStatus } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getEquipments = async (): Promise<Equipment[]> => {
  const equipments = await prismaClient.equipment.findMany();
  return equipments;
};

export const editEquipment = async (
  id: string,
  assetId: string,
  name: string,
  purchaseDate: Date,
  place: string,
): Promise<Equipment> => {
  const editedEquipment = await prismaClient.equipment.update({
    where: { id: id },
    data: {
      assetId: assetId,
      name: name,
      purchaseDate: purchaseDate,
      place: place,
    }
  });
  return editedEquipment;
};

export const createEquipment = async (
  assetId: string,
  name: string,
  status: EquipmentStatus,
  purchaseDate: Date,
  place: string,
): Promise<Equipment> => {
  const createdEquipment = await prismaClient.equipment.create(
    {
      data: {
        assetId: assetId,
        name: name,
        status: status,
        purchaseDate: purchaseDate,
        place: place,
      }
    }
  );
  return createdEquipment;
}

export const deleteEquipment = async (id: string) => {
  await prismaClient.equipment.delete(
    {
      where: { id: id }
    }
  )
}