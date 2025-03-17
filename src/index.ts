import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PORT } from "./constants";
import { router } from "./routers";

const port = PORT;
const app = new Hono();

app.use(cors());

app.route("/", router);

serve({
	fetch: app.fetch,
	port,
});
