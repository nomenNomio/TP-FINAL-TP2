import { Router } from "express";
import UserControllers from "../controllers/UserController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const userControllers = new UserControllers();
const userRoutes = Router();


userRoutes.post("/", userControllers.createUser);
userRoutes.post("/login", userControllers.login);

userRoutes.use(validateLogin);

    userRoutes.get("/", userControllers.getAllUser);
    userRoutes.get("/:id", userControllers.getUserById);

    userRoutes.put("/", userControllers.updateUser);
    userRoutes.delete("/", userControllers.deleteUser);
    userRoutes.get("/me", userControllers.me);

    userRoutes.get("/favourite", userControllers.getAllFavouriteGames);

    userRoutes.put("/favourite", userControllers.faveUnFave);
    userRoutes.post("/buygame", userControllers.buyGame);
    userRoutes.post("/claimgame", userControllers.claimGame);






export default userRoutes;