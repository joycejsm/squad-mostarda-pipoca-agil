import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/router.js"; // Importa o arquivo de rotas
import { initializeSocket } from "./sockets/socketController.js"; // Importa o controlador do WebSocket
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";



// 1. Configurações do Servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 2. Middlewares
app.use(express.json()); // Permite que o Express entenda requisições JSON

app.use((err, req, res, next) => {
  if(err instanceof SyntaxError && err.status === 400 && 'body in err') {
    return res.status(400).send({
      success: false,
      message: "JSON inválido na requisição. Verifique a sintaxe"
    });
  }

  next()
})
app.use(cookieParser())
app.use(express.static(__dirname))
// 3. Rotas da API
app.use(router);
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})
// 4. Lógica de WebSockets
initializeSocket(io); // Inicializa a lógica do Socket.IO em um arquivo separado



// 5. Iniciar o Servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
});