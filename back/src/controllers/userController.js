import { registerUser, updateUserWithCredentials } from "../services/userService.js";

/**
 * Primeira tela: cria usuário só com username.
 */
export const register = async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = await registerUser(username);
    res.status(201).json({
      message: "Usuário temporário criado com sucesso!",
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Segunda tela: completa cadastro com email e senha.
 */
export const completeRegistration = async (req, res) => {
  const { id, email, password } = req.body;

  try {
    const updatedUser = await updateUserWithCredentials(id, email, password);
    res.status(200).json({
      message: "Registro concluído com sucesso!",
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
