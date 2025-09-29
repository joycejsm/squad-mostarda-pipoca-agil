import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/**
 * Primeira etapa do registro (somente username).
 * - Permite nomes repetidos (não é único).
 * - Cria usuário "incompleto".
 * - GERA O JWT com o ID do usuário
 */
export const registerUser = async (username) => {
  if (!username || username.trim() === "") {
    throw new Error("O nome de usuário é obrigatório.");
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      isComplete: false,
    },
  });

  const token = jwt.sign({userId: newUser.id} , process.env.JWT_SECRET, {
    expiresIn: "30m",
  })

  return {newUser, token};
};

/**
 * Segunda etapa do registro (email + senha).
 * - Email é único (o Prisma já garante).
 * - Atualiza o usuário existente e marca como completo.
 * - Recebe o ID DO TOKEN e completa o cadastro.
 */
export const updateUserWithCredentials = async (id, email, password) => {
  if (!email || email.trim() === "" || !password || password.length < 6) {
    throw new Error("E-mail e senha são obrigatórios e válidos.");
  }

  const numericId = Number(id);

  // 🔒 Quando for usar bcrypt, troque isso:
  const hashedPassword = await bcrypt.hash(password, 10);

  const userToUpdate = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!userToUpdate) {
    throw new Error("Usuário não encontrado ou token inválido.");
  }

  // const existingEmailUser = await prisma.user.findUnique({
  //   where: {email},
  // });

  // if (existingEmailUser) {
  //   throw new Error("Este e-mail já está em uso.")
  // }

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email,
      password: hashedPassword,
      isComplete: true,
    },
  });

  return updatedUser;
};

export const authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios para o login.")
  }

  const user = await prisma.user.findUnique({
    where: {email},
  })



  //se o user não existe ou o cadastro não está completo

if (!user || !user.isComplete) {
  throw new Error("Credenciais inválidas.")
}

//comparar a senha informada com a criptografada

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  throw new Error("Credenciais inválidas")
}

// Gerar o token JWT

const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
  expiresIn: "1h",
})

return {token, user: { id: user.id, username: user.username, email: user.email} };
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {id: Number(id)},
    select: {
      id: true, 
      username: true, 
      email: true,
      isComplete: true,
    },
  })

  if(!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
}




