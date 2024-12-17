import { Router } from "express";
import RegisterUserController from "../Controllers/Users/Register.Controller";
import TokenService from "../Services/Token.Service";
import EncryptService from "../Services/Encrypt.Service";
import UserService from "../Services/User.Service";


const router = Router();

const tokenService = new TokenService();
const encryptService = new EncryptService();
const userService = new UserService();
const userController = new RegisterUserController(
    tokenService,
    encryptService,
    userService
);

 router.post("/register", userController.run.bind(userController));

export { router as UserRouter };
