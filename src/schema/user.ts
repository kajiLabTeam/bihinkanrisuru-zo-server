import { z } from "zod";
import { getQuerySchema } from "./common/query";
import { UserStatusEnum } from "./common/status";

const userSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
	status: UserStatusEnum.optional().openapi({
		description: "ステータス",
		example: "PENDING",
	}),
});

export const getUsersQuerySchema = getQuerySchema.merge(
	z.object({
		id: z.string().optional().openapi({
			description: "学生証のバーコードから読み取れるユーザーID",
			example: "20k23075",
		}),
		name: z.string().optional().openapi({
			description: "ユーザー名",
			example: "tada",
		}),
	}),
);

export const getUserResponseSchema = userSchema.openapi({
	description: "ユーザー情報",
});

export const getUsersResponseSchema = z.object({
	users: z.array(
		userSchema.openapi({
			description: "ユーザー情報",
		}),
	),
});

export const createUserRequestSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
});

export const putUserRequestSchema = z.object({
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
	status: UserStatusEnum.optional().openapi({
		description: "ステータス",
		example: "PENDING",
	}),
});

export const createUserResponseSchema = userSchema.openapi({
	description: "ユーザー情報",
});

export const userPathParamSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
