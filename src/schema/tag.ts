import { z } from "zod";

export const tagSchema = z.object({
	id: z.string().openapi({ example: "nw45xe6ksp4c8seq8u550lt8" }),
	name: z.string().openapi({ example: "Essential Equipment" }),
});
