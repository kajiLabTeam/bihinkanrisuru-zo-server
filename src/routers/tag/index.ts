import { OpenAPIHono } from "@hono/zod-openapi";
import { createTagHandler } from "~/handlers/tag/createTag";
import { getTagsHandler } from "~/handlers/tag/getTags";
import { createTagRoute, getTagsRoute } from "./route";

export const tagRouter = new OpenAPIHono();

tagRouter.openapi(getTagsRoute, getTagsHandler);
tagRouter.openapi(createTagRoute, createTagHandler);
