import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { router } from "./routers";

const port = 3000;
const app = new Hono();

router.use(cors());

router.route("/", router);

serve({
	fetch: router.fetch,
	port,
});
