import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import equipmentRouter from "./routers/equipments";
import userRouter from "./routers/users";

const port = 3000;
const router = new OpenAPIHono();

router.use(cors());

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

serve({
	fetch: router.fetch,
	port,
});
