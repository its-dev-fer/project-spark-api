import { Router } from "express";
import RegisterUserController from "../Controllers/Users/Register.Controller";
import TokenService from "../Services/Token.Service";
import EncryptService from "../Services/Encrypt.Service";
import UserService from "../Services/User.Service";
import UpdateUserController from "../Controllers/Users/Update.controller";
import AuthMiddleware from "../Middleware/Auth.Middleware";
const router = Router();

const tokenService = new TokenService();
const encryptService = new EncryptService();
const userService = new UserService();
const auhtMiddleware = new AuthMiddleware(tokenService);
const updateUserController = new UpdateUserController(encryptService);
const userController = new RegisterUserController(
    tokenService,
    encryptService,
    userService
);

router.post("/register", userController.run.bind(userController));
router.put(
    "/update",
    auhtMiddleware.run.bind(auhtMiddleware),
    updateUserController.run.bind(updateUserController)
);

export { router as UserRouter };
