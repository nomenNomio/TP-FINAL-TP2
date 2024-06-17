import { Router } from "express";
import gameRoutes from "./gameRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();
routes.use("/game", gameRoutes)
routes.use("/user", userRoutes)

export default routes;