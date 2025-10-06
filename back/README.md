
-----

# 📚 BACKEND SETUP GUIDE PARA QA

Este documento contém as instruções detalhadas para configurar, instalar e executar o ambiente de backend localmente, permitindo que a equipe de QA (Garantia de Qualidade) possa realizar os testes.

## 1\. Pré-Requisitos (O que você precisa ter)

Certifique-se de que as seguintes ferramentas estejam instaladas na sua máquina antes de iniciar a configuração:

| Ferramenta | Propósito | Link de Download |
| :--- | :--- | :--- |
| **Node.js (Versão LTS)** | Ambiente de execução do backend. | [nodejs.org](https://nodejs.org/en/download) |
| **Git** | Ferramenta para gerenciar e clonar o código. | [git-scm.com](https://git-scm.com/downloads) |
| **VS Code** | Editor de código recomendado para edição e visualização. | [code.visualstudio.com](https://code.visualstudio.com/download) |

## 2\. Configuração Inicial do Projeto

### 2.1. Clonar o Repositório

Abra o terminal (ou *Git Bash*) e execute os seguintes comandos para baixar o código e navegar para o diretório do backend:

```bash
# 1. Clonar o repositório
git clone https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

# 2. Navegar para o diretório do backend (ajuste o nome do diretório se for diferente)
cd squad-mostarda-pipoca-agil
cd back

#3. Certifique-se de ter o caminho abaixo no terminal
~/pipoca-agil-squad-mostarda/squad-mostarda-pipoca-agil/back$
```

### 2.2. Instalar as Dependências

Dentro do diretório `/back`, use o `npm` para baixar todas as bibliotecas e pacotes necessários para o projeto:

```bash
npm install
```

## 3\. Configuração do Banco de Dados (Supabase)

O backend depende de uma conexão ativa com o banco de dados PostgreSQL no Supabase.

### 3.1. Criar o Arquivo de Chaves (`.env`)

Crie um novo arquivo chamado **`.env`** (com um ponto na frente e sem extensão) dentro do diretório `/back`.

### 3.2. Preencher o Arquivo `.env`

Você precisará da chave de conexão fornecida pela equipe de desenvolvimento (**`DATABASE_URL`**).

Copie e cole as seguintes linhas no seu arquivo `.env`, **substituindo o placeholder** pela chave real:

```
# Variáveis de Ambiente para o Backend

# URL de Conexão Direta (Direct Connection String) para o PostgreSQL do Supabase.
DATABASE_URL="[SUA_CHAVE_DE_CONEXAO_DO_SUPABASE]"

# Porta em que o servidor irá escutar (Padrão: 3000)
PORT=3000
```

## 4\. Execução e Teste

### 4.1. Iniciar o Servidor

No terminal, estando no diretório `/back`, execute o comando de desenvolvimento. Ele usará o `nodemon` para reiniciar automaticamente em caso de mudanças no código.

```bash
npm run dev
```

### 4.2. Verificação de Sucesso

Após a execução, o servidor estará ativo se você vir uma mensagem similar no terminal:

```
Servidor rodando na porta 3000
```

Se o servidor for iniciado, você pode começar a enviar requisições (por exemplo, usando Postman ou Insomnia) para a URL base: `http://localhost:3000`.

## 5\. Próximos Passos para QA

1.  **Ferramenta de Teste:** Utilize o **Postman** ou **Insomnia** para construir e enviar requisições REST (POST, GET, etc.).
2.  **Endpoints:** A documentação dos endpoints específicos (ex: `/auth/register`, `/auth/login`) será fornecida separadamente pela equipe de desenvolvimento.
3.  **Status do Servidor:** Se o servidor falhar após o início, verifique se a `DATABASE_URL` no arquivo `.env` está correta e tente `npm run dev` novamente.