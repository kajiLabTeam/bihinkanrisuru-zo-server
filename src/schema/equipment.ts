import { z } from "zod";
import { getQuerySchema } from "./common/query";
import { unixTimestampSchema } from "./common/time";
import { tagSchema } from "./tag";

const equipmentSchema = z.object({
	id: z.string().openapi({
		description: "機器ID",
		example: "af5pgobariolcb44m5xim5zn",
	}),
	asset_id: z.string().openapi({
		description: "資産管理ID",
		example: "1234-0000",
	}),
	name: z.string().openapi({
		description: "機器の名称",
		example: "ノートPC",
	}),
	status: z.string().openapi({
		description: "機器の貸出状態 (貸出中など)",
		example: "BORROWED",
	}),
	place: z.string().openapi({
		description: "機器の保管場所",
		example: "bookshelf-4",
	}),
	registration_at: unixTimestampSchema.openapi({
		description: "登録日",
		example: 1633824000000,
	}),
	purchase_at: unixTimestampSchema.openapi({
		description: "購入日",
		example: 1633824000000,
	}),
	borrower: z
		.object({
			id: z.string().openapi({
				description: "学生証のバーコードから読み取れるユーザーID",
				example: "20k23075",
			}),
			name: z.string().openapi({
				description: "ユーザー名",
				example: "tada",
			}),
			status: z.string().optional().openapi({
				description: "ステータス",
				example: "APPROVED",
			}),
			borrowed_at: unixTimestampSchema.openapi({
				description: "借りた日時",
				example: 1633824000000,
			}),
		})
		.nullable()
		.openapi({
			description: "貸出中の借用者",
			example: {
				id: "20k23075",
				name: "tada",
				status: "APPROVED",
				borrowed_at: 1633824000000,
			},
		}),
	tags: z.array(tagSchema).openapi({
		description: "機器のタグ一覧",
		example: [
			{ id: "nw45xe6ksp4c8seq8u550lt8", name: "PC" },
			{ id: "f7xx5gajjfbhprpj3eg39voh", name: "本" },
		],
	}),
});

export const getEquipmentResponseSchema = equipmentSchema;

export const getEquipmentsQuerySchema = getQuerySchema.merge(
	z.object({
		name: z.string().optional().openapi({
			description: "備品名",
			example: "ノートPC",
		}),
	}),
);

export const getEquipmentsResponseSchema = z.object({
	equipments: z.array(equipmentSchema),
});

export const getEquipmentStatusResponseSchema = z.object({
	status: z.array(
		z.string().openapi({
			description: "機器の貸出状態 (貸出中など)",
			example: "BORROWED",
		}),
	),
});

export const createEquipmentRequestSchema = z.object({
	asset_id: z.string().openapi({
		description: "資産管理ID",
		example: "1234-0002",
	}),
	name: z.string().openapi({
		description: "機器の名称",
		example: "togawaさんのM3 MacBook Pro",
	}),
	purchase_at: unixTimestampSchema.optional().openapi({
		description: "購入日",
		example: 1633824000000,
	}),
	place: z.string().openapi({
		description: "機器の保管場所",
		example: "梶研究室学生部屋",
	}),
	tag_ids: z.array(z.string()).openapi({
		description: "機器のタグID",
		example: ["mjfqjy1iyuplusaonrecuupk"],
	}),
});

export const createEquipmentResponseSchema = equipmentSchema;

export const putEquipmentsRequestSchema = z.object({
	asset_id: z.string().optional().openapi({
		description: "資産管理ID",
		example: "1234-0000",
	}),
	name: z.string().optional().openapi({
		description: "機器の名称",
		example: "ノートPC",
	}),
	status: z.string().optional().openapi({
		description: "機器の貸出状態 (貸出中など)",
		example: "貸出中",
	}),
	purchase_at: unixTimestampSchema.optional().openapi({
		description: "購入日 (UNIXタイムスタンプ)",
		example: 1633824000000,
	}),
	place: z.string().optional().openapi({
		description: "機器の保管場所",
		example: "bookshelf-4",
	}),
	tag_ids: z.array(z.string()).openapi({
		description: "機器のタグID",
		example: ["nw45xe6ksp4c8seq8u550lt8", "f7xx5gajjfbhprpj3eg39voh"],
	}),
});

export const equipmentPathParamsSchema = z.object({
	id: z.string().openapi({
		description: "DBに登録された機器ID",
		example: "af5pgobariolcb44m5xim5zn",
	}),
});

export const borrowEquipmentRequestSchema = z.object({
	user_id: z.string().openapi({
		description: "ユーザーID",
		example: "20k23075",
	}),
});

export type GetEquipmentResponse = z.infer<typeof getEquipmentResponseSchema>;
export type GetEquipmentsResponse = z.infer<typeof getEquipmentsResponseSchema>;
export type GetEquipmentStatusResponse = z.infer<
	typeof getEquipmentStatusResponseSchema
>;
export type CreateEquipmentRequest = z.infer<
	typeof createEquipmentRequestSchema
>;
export type CreateEquipmentResponse = z.infer<
	typeof createEquipmentResponseSchema
>;
export type PutEquipmentsRequest = z.infer<typeof putEquipmentsRequestSchema>;
