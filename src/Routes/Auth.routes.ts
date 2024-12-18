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
const authController = new AuthController(tokenService, encryptService, userService);

const refreshTokenController = new RefreshTokenController(tokenService);

router.post("/login", (req, res) => authController.access(req, res));
router.post("/refresh", (req, res) => refreshTokenController.run(req, res));

export { router as AuthRouter };
