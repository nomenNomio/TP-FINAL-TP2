import { Router } from "express";
import gameRoutes from "./gameRoutes.js";


const routes = Router();
routes.use("/game", gameRoutes)


export default routes;