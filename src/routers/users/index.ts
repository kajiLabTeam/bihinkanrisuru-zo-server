import { OpenAPIHono } from "@hono/zod-openapi";
import { approveUserHandler } from "~/handlers/users/approveUser";
import { createUserHandler } from "~/handlers/users/createUser";
import { getUsersHandler } from "~/handlers/users/getUsers";
import { rejectUserHandler } from "~/handlers/users/rejectUser";
import {
	approveUserRoute,
	createUserRoute,
	getUsersRoute,
	rejectUserRoute,
} from "./users";

const userRouter = new OpenAPIHono();

userRouter.openapi(getUsersRoute, getUsersHandler);
userRouter.openapi(createUserRoute, createUserHandler);
userRouter.openapi(approveUserRoute, approveUserHandler);
userRouter.openapi(rejectUserRoute, rejectUserHandler);

export default userRouter;
