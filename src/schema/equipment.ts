import { z } from "zod";
import { tagSchema } from "./tag";
import { unixTimestampSchema } from "./time";

export const getEquipmentsResponseSchema = z.object({
	equipments: z.array(
		z.object({
			equipment_id: z.string().openapi({
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
			states: z.string().openapi({
				description: "機器の貸出状態 (貸出中など)",
				example: "borrowed",
			}),
			borrower: z.string().openapi({
				description: "貸出中の借用者",
				example: "tada",
			}),
			borrowed_date: unixTimestampSchema.openapi({
				description: "貸出日",
				example: 1633824000000,
			}),
			registration_date: unixTimestampSchema.openapi({
				description: "登録日",
				example: 1633824000000,
			}),
			purchase_date: unixTimestampSchema.openapi({
				description: "購入日",
				example: 1633824000000,
			}),
			place: z.string().openapi({
				description: "機器の保管場所",
				example: "bookshelf-4",
			}),
			tags: z.array(tagSchema).openapi({
				description: "機器のタグ一覧",
				example: [
					{ id: "nw45xe6ksp4c8seq8u550lt8", name: "PC" },
					{ id: "f7xx5gajjfbhprpj3eg39voh", name: "本" },
				],
			}),
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
	purchase_date: unixTimestampSchema.optional().openapi({
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

export const createEquipmentResponseSchema = z.object({
	id: z.string().openapi({
		description: "DBで管理されるID",
		example: "af5pgobariolcb44m5xim5zn",
	}),
	asset_id: z.string().openapi({
		description: "資産管理ID",
		example: "1234-0002",
	}),
	name: z.string().openapi({
		description: "機器の名称",
		example: "togawaさんのM3 MacBook Pro",
	}),
	place: z.string().openapi({
		description: "機器の保管場所",
		example: "梶研究室学生部屋",
	}),
	status: z.string().openapi({
		description: "機器の貸出状態",
		example: "AVAILABLE",
	}),
	purchase_date: unixTimestampSchema.openapi({
		description: "購入日",
		example: 1633824000000,
	}),
	tags: z.array(tagSchema).openapi({
		description: "機器のタグ一覧",
		example: [{ id: "mjfqjy1iyuplusaonrecuupk", name: "PC" }],
	}),
});

export const putEquipmentsRequestSchema = z.object({
	asset_id: z.string().optional().openapi({
		description: "資産管理ID",
		example: "1234-0000",
	}),
	name: z.string().optional().openapi({
		description: "機器の名称",
		example: "ノートPC",
	}),
	states: z.string().optional().openapi({
		description: "機器の貸出状態 (貸出中など)",
		example: "貸出中",
	}),
	purchase_date: unixTimestampSchema.optional().openapi({
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

export const putEquipmentsResponseSchema = z.object({
	asset_id: z.string().optional().openapi({
		description: "資産管理ID",
		example: "1234-0000",
	}),
	name: z.string().optional().openapi({
		description: "機器の名称",
		example: "ノートPC",
	}),
	states: z.string().optional().openapi({
		description: "機器の貸出状態 (貸出中など)",
		example: "貸出中",
	}),
	purchase_date: unixTimestampSchema.optional().openapi({
		description: "購入日 (UNIXタイムスタンプ)",
		example: 1633824000000,
	}),
	place: z.string().optional().openapi({
		description: "機器の保管場所",
		example: "bookshelf-4",
	}),
	tags: z.array(tagSchema).openapi({
		description: "機器のタグ一覧",
		example: [
			{ id: "nw45xe6ksp4c8seq8u550lt8", name: "PC" },
			{ id: "f7xx5gajjfbhprpj3eg39voh", name: "本" },
		],
	}),
});

export const deleteEquipmentsResponseSchema = z.object({
	result: z.enum(["success", "failure"]).openapi({
		description: "削除結果",
		example: "success",
	}),
});

export type GetEquipmentsResponse = z.infer<typeof getEquipmentsResponseSchema>;
export type CreateEquipmentRequest = z.infer<
	typeof createEquipmentRequestSchema
>;
export type CreateEquipmentResponse = z.infer<
	typeof createEquipmentResponseSchema
>;
export type PutEquipmentsRequest = z.infer<typeof putEquipmentsRequestSchema>;
export type PutEquipmentsResponse = z.infer<typeof putEquipmentsResponseSchema>;
export type DeleteEquipmentsResponse = z.infer<
	typeof deleteEquipmentsResponseSchema
>;
