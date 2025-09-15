// src/routes/router.js
import { Router } from "express";
import { register, completeRegistration } from "../controllers/userController.js";

const router = Router();

// Rota para o registro do nome de usuário (primeira tela)
router.post("/api/users/register", register);

// Nova rota para o cadastro de email e senha (segunda tela)
router.post("/api/users/complete-registration", completeRegistration);

export default router;