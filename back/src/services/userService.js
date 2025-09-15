import { PrismaClient } from "../generated/prisma/index.js";
// import bcrypt from "bcrypt"; // quando quiser usar hash de senha

const prisma = new PrismaClient();

/**
 * Primeira etapa do registro (somente username).
 * - Permite nomes repetidos (não é único).
 * - Cria usuário "incompleto".
 */
export const registerUser = async (username) => {
  if (!username || username.trim() === "") {
    throw new Error("O nome de usuário é obrigatório.");
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      isComplete: false
    }
  });

  return newUser;
};

/**
 * Segunda etapa do registro (email + senha).
 * - Email é único (o Prisma já garante).
 * - Atualiza o usuário existente e marca como completo.
 */
export const updateUserWithCredentials = async (id, email, password) => {
  if (!email || email.trim() === "" || !password || password.length < 6) {
    throw new Error("E-mail e senha são obrigatórios e válidos.");
  }

  // 🔒 Quando for usar bcrypt, troque isso:
  // const hashedPassword = await bcrypt.hash(password, 10);

  const userToUpdate = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!userToUpdate) {
    throw new Error("Usuário não encontrado.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email,
      password, // quando usar hash: hashedPassword
      isComplete: true
    }
  });

  return updatedUser;
};

