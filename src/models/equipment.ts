import { Equipment } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getEquipments = async (): Promise<Equipment[]> => {
  const equipments = await prismaClient.equipment.findMany();
  return equipments;
};
