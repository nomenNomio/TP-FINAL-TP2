import { Router } from "express";
import UserControllers from "../controllers/UserController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const userControllers = new UserControllers();
const userRoutes = Router();

userRoutes.post("/login", userControllers.login);
userRoutes.post("/", userControllers.createUser);

userRoutes.use(validateLogin);
userRoutes.post("/buygame", userControllers.buyGame);
userRoutes.post("/claimgame", userControllers.claimGame);
userRoutes.put("/favourite", userControllers.faveUnFave);
userRoutes.get("/favourite", userControllers.getAllFavouriteGames);
userRoutes.get("/me", userControllers.me);
userRoutes.get("/", userControllers.getAllUser);
userRoutes.get("/:id", userControllers.getUserById);
userRoutes.put("/:id", userControllers.updateUser);
userRoutes.delete("/:id", userControllers.deleteUser);

export default userRoutes;