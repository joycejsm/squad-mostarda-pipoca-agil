

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








