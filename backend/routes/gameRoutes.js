import { Router } from "express";
import GameController from "../controllers/GameController.js";

const gameController = new GameController();
const gameRoutes = Router();

gameRoutes.get("/", gameController.getAllGames)
gameRoutes.post("/", gameController.createGame);
gameRoutes.delete("/", gameController.deleteGame);


export default gameRoutes;