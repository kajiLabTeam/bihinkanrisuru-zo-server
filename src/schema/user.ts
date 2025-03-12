import { z } from "zod";
import { stringToIntWithDefault } from "~/utils/queryParse";

export const getUsersQuerySchema = z.object({
	id: z.string().optional().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	name: z.string().optional().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
	limit: z.string().optional().transform(stringToIntWithDefault(50)).openapi({
		description: "取得するユーザの最大数",
		example: "50",
	}),
	offset: z.string().optional().transform(stringToIntWithDefault(0)).openapi({
		description: "取得するユーザのオフセット",
		example: "0",
	}),
	sort: z.string().default("createdAt").openapi({
		description: "ユーザのソート順",
		example: "createdAt",
	}),
	order: z.string().default("desc").openapi({
		description: "ユーザのソート順",
		example: "desc",
	}),
});

export const getUsersResponseSchema = z.object({
	users: z.array(
		z.object({
			id: z.string().openapi({
				description: "学生証のバーコードから読み取れるユーザーID",
				example: "20k23075",
			}),
			name: z.string().openapi({
				description: "ユーザー名",
				example: "tada",
			}),
			status: z.string().openapi({
				description: "ステータス",
				example: "pending",
			}),
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

export const createUserResponseSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	status: z.string().openapi({
		description: "ステータス",
		example: "pending",
	}),
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
});

export const approveUserPathParamSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
});

export const approveUserResponseSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	status: z.string().openapi({
		description: "ステータス",
		example: "approved",
	}),
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
});

export const rejectUserPathParamSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
});

export const rejectUserResponseSchema = z.object({
	id: z.string().openapi({
		description: "学生証のバーコードから読み取れるユーザーID",
		example: "20k23075",
	}),
	status: z.string().openapi({
		description: "ステータス",
		example: "rejected",
	}),
	name: z.string().openapi({
		description: "ユーザー名",
		example: "tada",
	}),
});

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type ApproveUserResponse = z.infer<typeof approveUserResponseSchema>;
export type RejectUserResponse = z.infer<typeof rejectUserResponseSchema>;
