// src/routes/router.js
import { Router } from "express";
import { register, completeRegistration, login, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";
const router = Router();

// Rota para o registro do nome de usuário (primeira tela)
router.post("/api/users/register", register);

// Nova rota para o cadastro de email e senha (segunda tela)
router.post("/api/users/complete-registration", completeRegistration);

//rota de login de usuário
router.post("/api/users/login", login);

//rota protegida com token

router.get("/api/users/me", authMiddleware, getProfile)

export default router;