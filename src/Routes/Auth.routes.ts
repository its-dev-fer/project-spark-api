import { Router } from "express";
import AuthController from "../Controllers/Auth/Auth.controller";
import RefreshTokenController from "../Controllers/Auth/RefreshToken.controller";
import TokenService from "../Services/Token.Service";
import EncryptService from "../Services/Encrypt.Service";
import UserService from "../Services/User.Service";

const router = Router();

const tokenService = new TokenService();
const encryptService = new EncryptService();
const userService = new UserService();
const authController = new AuthController(
    tokenService,
    encryptService,
    userService
);

const refreshTokenController = new RefreshTokenController(tokenService);

router.post("/login", authController.access.bind(authController));
router.post(
    "/refresh",
    refreshTokenController.run.bind(refreshTokenController)
);

export { router as AuthRouter };
