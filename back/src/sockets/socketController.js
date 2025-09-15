// src/sockets/socketController.js

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Um novo cliente se conectou!");

    // Envia uma notificação para o cliente que acabou de se conectar
    socket.emit("notificacao", { mensagem: "Bem-vindo ao servidor!" });

    socket.on("disconnect", () => {
      console.log("Um cliente se desconectou.");
    });
  });
};