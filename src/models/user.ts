import { User } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const getUsers = async (): Promise<User[]> => {
  const users = await prismaClient.user.findMany();
  return users;
};
