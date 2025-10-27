import { registerUser, updateUserWithCredentials, authenticateUser, getUserById } from "../services/userService.js";

/**
 * Primeira tela: cria usuário só com username e envia JWT VIA COOKIE.
 */
export const register = async (req, res) => {
  const { username } = req.body;

  try {
    const {newUser, token} = await registerUser(username);

    res.cookie('tempAuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000,
      sameSite: 'Lax',
    });

    res.status(201).json({
      message: "Usuário temporário criado com sucesso!",
      user: {id: newUser.id, username: newUser.username}
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Segunda tela: completa cadastro com email e senha.
 */
export const completeRegistration = async (req, res) => {

  const userIdFromToken = req.userId;
  const { email, password, accept_lgpd } = req.body;

  // const numericId = Number(id); !!!apagar depois

  if(!userIdFromToken) {
    return res.status(401).json({error: "Token de registro não encontrado ou inválido"})
  }

  try {

    res.clearCookie('tempAuthToken');

    const updatedUser = await updateUserWithCredentials(userIdFromToken, email, password, accept_lgpd);
    res.status(200).json({
      message: "Registro concluído com sucesso! Faça login para continuar.",
      user: updatedUser
    });
  } catch (error) {

    if (error.status === 409) {
      return res.status(409).json({error: error.message})
    }
    res.status(400).json({ error: error.message });
  }
};

//rota de login: autentica o user e retorna um jwt

export const login = async (req, res) => {
  const {email, password} = req.body;

  try {
  const {token, user} = await authenticateUser(email, password);
  res.status(200).json({
    message: "Login bem-sucedido!",
    token,
    user,
  })
} catch (error) {
  res.status(401).json({error: error.message});
  
}
}

export const getProfile = async (req, res) => {
  const userId = req.userId;


  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {

    res.status(404).json({error: error.message})
    
  }
}





