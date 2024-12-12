import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import TokenService from "../services/Token.Service";
// Ejemplo de importacion de controller
//import { MiControlador } from "....";

const router = Router();

// Ejemplo de instancia
//const miControlador = new MiControlador();
  const tokenService = new TokenService();
  const authController = new AuthController(tokenService);

// Ejemplo de ruta, puede ser get, post, put, patch, delete
// router.get("/", (req, res) =>
//     miControlador.getAllCategorias(req, res)
// );

router.post('/login',(req, res) => authController.access(req, res));

export default router;
