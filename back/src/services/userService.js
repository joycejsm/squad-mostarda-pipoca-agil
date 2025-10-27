import { PrismaClient } from "../generated/prisma/index.js";
import {v7 as uuidv7} from "uuidv7";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const newUserId = uuidv7();

const USERNAME_REGEX = /^[A-Za-z\s]+$/; //regra que permite apenas letras e espaços

const MAX_USERNAME_LENGTH = 144; 

const MIN_USERNAME_LENGTH = 3;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Primeira etapa do registro (somente username).
 * - Permite nomes repetidos (não é único).
 * - Cria usuário "incompleto".
 * - GERA O JWT com o ID do usuário
 */
export const registerUser = async (username) => {

  if(typeof username !== "string") {
    throw new Error ("O nome de usuário deve ser uma sequência de letras.")
  }

  if (!username || username.trim() === "") {
    throw new Error("O nome de usuário é obrigatório.");
  }

  if(username.length > MAX_USERNAME_LENGTH) {
    throw new Error(`O nome de usuário não pode exceder ${MAX_USERNAME_LENGTH} caracteres`)
  }

  if(username.length < MIN_USERNAME_LENGTH){
    throw new Error(`O nome de usuário deve ter pelo menos 3 letras.`)
  }

  if(!USERNAME_REGEX.test(username)) {
    throw new Error("O nome de usuário deve conter apenas letras e não pode ter números ou caracteres especiais.")
  }

  const newUser = await prisma.user.create({
    data: {
      id: newUserId,
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
export const updateUserWithCredentials = async (id, email, password, accept_lgpd) => {
   const numericId = Number(id);

  if (!email || email.trim() === "" || !password || password.length < 6) {
    throw new Error("E-mail e senha são obrigatórios.");

  }

  if (!EMAIL_REGEX.test(email)) {
  throw new Error("Formato de e-mail inválido.");
}

  if (accept_lgpd !== true) {
    throw new Error("É obrigatório aceitar os Termos de Uso e a Política de Privacidade(LGPD).")
  }

  const existingEmailUser = await prisma.user.findUnique({
    where: {email},
  });

  //Verifica se o email já existe e se o ID do usuário encontrado é diferente do usuário que está tentando atualizar.
  if (existingEmailUser && existingEmailUser.id !== Number(id)) {

    const error = new Error("Este e-mail já está em uso.")
    error.status = 409; 
    throw error;
  }


  // const numericId = Number(id);

  //  Quando for usar bcrypt, troque isso:
  const hashedPassword = await bcrypt.hash(password, 10);

  const userToUpdate = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!userToUpdate) {
    throw new Error("Usuário não encontrado ou token inválido.");
  }

  
  const updatedUser = await prisma.user.update({
    where: { id: numericId },
    data: {
      email,
      password: hashedPassword,
      isComplete: true,

      accept_lgpd: true,
      date_accept: new Date(),
    },

    select: {
      id: true,
      username: true,
      email: true,
      isComplete: true,
      accept_lgpd: true,
      date_accept: true,
      createdAt: true,
      updatedAt: true,
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




