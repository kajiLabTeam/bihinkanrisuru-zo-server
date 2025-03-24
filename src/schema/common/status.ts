import { EquipmentStatus, UserStatus } from "@prisma/client";
import { z } from "zod";

export const UserStatusEnum = z.enum([
	UserStatus.PENDING,
	UserStatus.APPROVED,
	UserStatus.REJECTED,
]);

export const EquipmentStatusEnum = z.enum([
	EquipmentStatus.AVAILABLE,
	EquipmentStatus.BORROWED,
	EquipmentStatus.LOST,
]);
