import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { equipmentRouter } from "./equipments";
import { tagRouter } from "./tag";
import { userRouter } from "./users";

export const router = new OpenAPIHono();

router.route("/tags", tagRouter);
router.route("/users", userRouter);
router.route("/equipments", equipmentRouter);

router.doc("/specification", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "備品管理する蔵API",
	},
	tags: [
		{
			name: "tags",
			description: "タグ情報を管理するAPI",
		},
		{
			name: "users",
			description: "ユーザー情報を管理するAPI",
		},
		{
			name: "equipments",
			description: "備品情報を管理するAPI",
		},
	],
});

router.get("/docs", swaggerUI({ url: "/specification" }));
