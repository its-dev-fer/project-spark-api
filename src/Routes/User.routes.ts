import { Router } from "express";
import ProfileController from "../Controllers/Users/Profile.Controller";
import RegisterUserController from "../Controllers/Users/Register.Controller";
import TokenService from "../Services/Token.Service";
import EncryptService from "../Services/Encrypt.Service";
import UserService from "../Services/User.Service";
import ProfileService from "../Services/Profile.Service";
import AuthMiddleware from "../Middleware/Auth.Middleware";
const router = Router();

const tokenService = new TokenService();
const encryptService = new EncryptService();
const userService = new UserService();
const profileService = new ProfileService(userService);
const authMiddleware = new AuthMiddleware(tokenService);
const profileController = new ProfileController(userService, profileService);
const userController = new RegisterUserController(
    tokenService,
    encryptService,
    userService
);

router.post("/register", userController.run.bind(userController));
router.get(
    "/profile",
    authMiddleware.run.bind(authMiddleware),
    profileController.getUserProfile.bind(profileController)
);

export { router as UserRouter };
