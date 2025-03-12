import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import equipmentRouter from "./equipments";
import userRouter from "./users";

export const router = new OpenAPIHono();

router.route("/users", userRouter);
router.route("/equipments", equipmentRouter);

router.doc("/specification", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "備品管理する蔵API",
	},
});

router.get("/docs", swaggerUI({ url: "/specification" }));
