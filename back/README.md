

<!-- ````markdown -->
# 📚 BACKEND SETUP GUIDE PARA QA

Este documento contém instruções detalhadas para configurar, instalar e executar o ambiente de backend localmente, permitindo que a equipe de QA realize os testes com segurança.

---

## 1. Pré-Requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

| Ferramenta | Propósito | Link de Download |
|------------|-----------|-----------------|
| Node.js (Versão LTS) | Ambiente de execução do backend | [nodejs.org](https://nodejs.org) |
| Git | Clonar e gerenciar o código | [git-scm.com](https://git-scm.com) |
| VS Code | Editor recomendado | [code.visualstudio.com](https://code.visualstudio.com) |

---

## 2. Configuração Inicial do Projeto

### 2.1. Clonar o Repositório
Abra o terminal (ou Git Bash) e execute:

```bash
# Clonar o repositório
git clone https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

# Entrar no diretório do backend
cd squad-mostarda-pipoca-agil/back
````

Certifique-se de que o terminal esteja no caminho correto:

```
~/pipoca-agil-squad-mostarda/squad-mostarda-pipoca-agil/back$
```

### 2.2. Instalar Dependências

Dentro do diretório `/back`, execute:

```bash
npm install
```

⚠️ Se algum pacote (ex: `nodemon`) não for instalado, rode manualmente:

```bash
npm install --save-dev nodemon
```

---

## 3. Configuração do Banco de Dados (Supabase)

### 3.1. Criar Arquivo de Chaves (.env)

Crie um arquivo chamado `.env` dentro do diretório `/back`.

### 3.2. Preencher o Arquivo .env

Copie e cole as linhas abaixo, substituindo `[SUA_CHAVE_DE_CONEXAO_DO_SUPABASE]` pela string fornecida pela equipe:

```env
# URL de conexão direta (Direct Connection) - ideal para redes IPv6
DATABASE_URL="[SUA_CHAVE_DE_CONEXAO_DO_SUPABASE]"

```

---

### ⚠️ Importante: IPv4 vs IPv6

* Se sua rede for **IPv6**, a conexão direta funciona normalmente.
* Se sua rede for **IPv4**, o Supabase **não permite conexão direta**.
  Nesse caso, use a **Transaction Pooler Connection String** (fornecida pela equipe) no lugar da `DATABASE_URL`.

---

### 3.3. Sincronizar o Schema do Prisma

Após configurar a `DATABASE_URL` e garantir conexão com o Supabase, execute:

```bash
npx prisma db pull
```

> Isso atualiza o schema local do Prisma (`prisma/schema.prisma`) com as tabelas e colunas do banco de dados.
> ⚠️ Este passo é **obrigatório** antes de rodar o servidor pela primeira vez.

Opcional: caso haja alterações no schema ou novas dependências do Prisma:

```bash
npx prisma generate
```

---

## 4. Execução e Teste

### 4.1. Iniciar o Servidor

Dentro do diretório `/back`:

```bash
npm run dev
```

> Isso usará o **nodemon** para reiniciar automaticamente o servidor em caso de alterações no código.

---

### 4.2. Verificação de Sucesso

O servidor estará ativo se você visualizar no terminal:

```
Servidor rodando na porta 3000
```

Você também pode testar acessando:

```
http://localhost:3000
```

> Mesmo um erro 404 significa que o backend respondeu, ou seja, está funcionando.

---

## 5. Próximos Passos para QA

* **Ferramentas de Teste:** Postman ou Insomnia.
<!-- * **Endpoints:** A documentação será fornecida separadamente (ex: `/api/users/register`, `/api/users/login`). -->
* **Status do Servidor:** Se falhar, confira a `DATABASE_URL` no `.env` e tente `npm run dev` novamente.

---

## 6. Troubleshooting Rápido

| Problema                     | Solução                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| Erro de conexão com o banco  | Verifique a `DATABASE_URL`. Se IPv4, use Pooler Connection.                      |
| `nodemon` não encontrado     | Rode: `npm install --save-dev nodemon`                                           |
| Servidor não inicia          | Delete `node_modules` e `package-lock.json`, depois rode `npm install` novamente |
| Prisma sem schema atualizado | Rode `npx prisma db pull`                                                        |
| Servidor não responde        | Confirme que `npm run dev` está ativo e verifique se porta 3000 está livre       |

---

## 7. Links Úteis

* [Documentação oficial Supabase](https://supabase.com/docs)
* [Postman](https://www.postman.com/)
* [Insomnia](https://insomnia.rest/)


##



---

Aqui está **a versão para README**, exatamente no padrão do último documento que gerei — **mesmo formato, mesma escrita, mesma estrutura**, porém agora formatado como um bloco de README.md para você colar direto no seu repositório.

---

# 🧪 Spike Técnico – Notificações em Tempo Real com WebSockets + Salvamento de Horário no Banco

Este spike foi criado para validar duas funcionalidades essenciais antes da implementação definitiva na aplicação:

1. **Salvamento do horário de lembrete no banco de dados (Supabase via Prisma).**
2. **Envio de notificações em tempo real usando Socket.IO (WebSockets).**

O objetivo foi **testar a viabilidade técnica**, validar o fluxo entre frontend ↔ backend e verificar se o uso conjunto de REST + WebSockets atende aos requisitos.

---

## ⚙️ Tecnologias Exploradas no Spike

* **Node.js / Express**
* **Socket.IO (WebSocket bidirecional)**
* **Prisma + Supabase (PostgreSQL)**
* **Fetch API no front**
* **HTML + JS puro para prototipação**
* **UUID estático para testes (sem alteração de schema)**

---

# 1. 🧩 Arquitetura do Spike

### 📌 Backend

O backend contém:

* Servidor Express
* Configuração do Socket.IO
* Rota `/api/reminder` responsável por salvar o horário no banco
* Emissão de eventos WebSocket após operação concluída
* Arquivo separado para controlar os eventos do WebSocket (`socketController.js`)

Fluxo resumido:

```
[Front-end] → POST /api/reminder → [Backend]
                                         ↓
             Salva horário no banco via Prisma
                                         ↓
                   Emite evento WebSocket para o cliente
```

O objetivo é garantir que **assim que um horário é salvo**, qualquer cliente conectado receba:

```json
{ mensagem: "Horário 07:00 salvo com sucesso!" }
```

---

### 📌 Frontend

O front usado no spike é apenas um **HTML simples** servindo como protótipo.

Ele faz:

* Conexão via WebSocket com o servidor
* Exibição das notificações recebidas
* Envio de requisições POST para os endpoints de teste
* Registro em tempo real das mensagens no DOM

Fluxo resumido:

```
[Socket.IO Client] → conecta
         ↓
Recebe: "Bem-vindo ao servidor!"
         ↓
Usuário salva horário → fetch("/api/reminder")
         ↓
Recebe: "Horário XX:XX salvo com sucesso!"
```

---

# 2. 🚀 Como o WebSocket foi implementado

### 📌 Instalação

```bash
npm install socket.io
```

---

### 📌 Servidor WebSocket – backend (`socketController.js`)

```js
export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Um novo cliente se conectou!");

    socket.emit("notificacao", { mensagem: "Bem-vindo ao servidor!" });

    socket.on("disconnect", () => {
      console.log("Um cliente se desconectou.");
    });
  });

  global._io = io; // Permite emitir notificações em qualquer arquivo
};
```

---

### 📌 Inicialização no servidor principal

```js
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

initializeSocket(io);
```

---

# 3. 💾 Salvamento do horário no banco (Prisma + Supabase)

### 📌 Endpoint `/api/reminder`

```js
export const saveReminderTime = async (req, res) => {
  try {
    const { time } = req.body;

    if (!time) return res.status(400).json({ error: "Horário é obrigatório" });

    const userId = req.user?.id || "UUID-ESTATICO-AQUI";

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
    return res.status(500).json({ error: "Erro ao salvar horário" });
  }
};
```

---

# 4. 🖥️ Frontend do Spike (como consumir o WebSocket)

### 📌 Conexão via Socket.IO Client

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:3000");

  socket.on("connect", () => console.log("Conectado ao WebSocket"));

  socket.on("notificacao", (data) => {
    console.log("Notificação recebida:", data);
  });
</script>
```

---

### 📌 Enviar horário para o backend

```js
fetch("http://localhost:3000/api/reminder", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ time: selectedTime }),
});
```

---

# 5. 🔍 Resultado Validado pelo Spike

### ✔ Backend salva o horário corretamente

### ✔ Notificação é emitida via WebSocket após o salvamento

### ✔ Front recebe e exibe notificações em tempo real

### ✔ Testado sem alterar schema (UUID fixo)

### ✔ Comunicação REST + WebSocket funcional

---

# 6. 📌 Próximos passos sugeridos

* Integrar autenticação JWT no fluxo real
* Criar lógica do disparo real dos lembretes (cron)
* Definir estrutura final do WebSocket para o app
* Criar documentação oficial da API no Swagger
* Integração com o frontend real (React)

---




