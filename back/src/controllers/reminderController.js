import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
export const saveReminderTime = async (req, res) => {
  try {
    const { time } = req.body;

    if (!time) {
      return res.status(400).json({ error: "Horário é obrigatório" });
    }

    // TODO: pegar ID real pelo token
    const userId = req.user?.id || "019a2534-9268-7a20-b52a-6d6d2661b650";

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { reminderTime: time },
    });

    global._io.emit("notificacao", {
      mensagem: `Horário ${time} salvo com sucesso!`,
    });

    return res.json({
      message: "Horário salvo no banco!",
      time: updatedUser.reminderTime,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar horário" });
  }
};

