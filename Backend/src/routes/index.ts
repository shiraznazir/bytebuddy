import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatsRoutes from "./chats-routes.js";

const appRouter =  Router();

appRouter.use('/user', userRoutes);
appRouter.use('/chats', chatsRoutes);

export default appRouter;