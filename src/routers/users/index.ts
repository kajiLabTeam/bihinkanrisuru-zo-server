import { OpenAPIHono } from "@hono/zod-openapi";
import { approveUserHandler } from "~/handlers/users/approveUser";
import { createUserHandler } from "~/handlers/users/createUser";
import { getUserHandler } from "~/handlers/users/getUser";
import { getUsersHandler } from "~/handlers/users/getUsers";
import { rejectUserHandler } from "~/handlers/users/rejectUser";
import {
	approveUserRoute,
	createUserRoute,
	getUserRoute,
	getUsersRoute,
	rejectUserRoute,
} from "./route";

export const userRouter = new OpenAPIHono();

userRouter.openapi(getUserRoute, getUserHandler);
userRouter.openapi(getUsersRoute, getUsersHandler);
userRouter.openapi(createUserRoute, createUserHandler);
userRouter.openapi(approveUserRoute, approveUserHandler);
userRouter.openapi(rejectUserRoute, rejectUserHandler);
