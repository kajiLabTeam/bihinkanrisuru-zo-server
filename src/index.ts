import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { router } from "./routers";

const port = 3000;
const app = new Hono();

app.use(cors());

app.route("/", router);

serve({
	fetch: app.fetch,
	port,
});
