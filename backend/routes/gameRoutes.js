import { Router } from "express";
import GameController from "../controllers/GameController.js";

const gameController = new GameController();
const gameRoutes = Router();

gameRoutes.post("/", gameController.createGame);


export default gameRoutes;