[Node Badge]: https://img.shields.io/badge/Node.js-5fa04e?style=for-the-badge&logo=nodedotjs&labelColor=000
[Typescript Badge]: https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&labelColor=000
[Express Badge]: https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&labelColor=000
[Prisma Badge]: https://img.shields.io/badge/Prisma-2d3748?style=for-the-badge&logo=prisma&labelColor=000
[Docker Badge]: https://img.shields.io/badge/Docker-2496ed?style=for-the-badge&logo=docker&labelColor=000

<h1 align="center" style="font-weight: bold;">API de Lista de Tarefas</h1>

<div align="center">

![node][Node Badge]
![typescript][Typescript Badge]
![express][Express Badge]
![prisma][Prisma Badge]
![docker][Docker Badge]

</div>

## Conteúdo

- [Sobre](#pushpin-sobre)
- [Tecnologias Utilizadas](#computer-tecnologias-utilizadas)
- [Instalação](#arrow_down-instalação)
- [Endpoints da API](#dart-endpoints-da-api)

## :pushpin: Sobre

Esta é uma API para gerenciamento de listas de tarefas. A API permite a criação de listas de tarefas, bem como a manipulação das tarefas dentro de cada lista.

## :computer: Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma
- Docker

## :arrow_down: Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download/current)

- [Git](https://git-scm.com/downloads)

- [Docker](https://www.docker.com/get-started)

### 1. Clone o repositório

```bash
git clone https://github.com/willvbgomes/lista-tarefas-api.git
cd lista-tarefas-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração (opcional, caso utilize o Docker)

Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. Ex:

```
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
```

### 4. Rodando a API

#### 4.1 Utilizando o Docker

Para rodar a API em um ambiente de containers Docker:

```bash
docker compose up -d
```

#### 4.2 Sem utilizar o Docker

Para rodar a API em modo de desenvolvimento com recarregamento automático:

```bash
npm run dev
```

Atualize o banco de dados conforme o arquivo schema.prisma:

```bash
npx prisma migrate dev
```

## :dart: Endpoints da API

| Rota                                           | Descrição                                         |
| ---------------------------------------------- | ------------------------------------------------- |
| <kbd>GET</kbd> /lists                          | Retorna todas as listas de tarefas.               |
| <kbd>POST</kbd> /lists                         | Cria uma nova lista de tarefas.                   |
| <kbd>PATCH</kbd> /lists/:listId                | Atualiza o título de uma lista de tarefas.        |
| <kbd>DELETE</kbd> /lists/:listId               | Deleta uma lista de tarefas.                      |
| <kbd>GET</kbd> /lists/:listId/tasks            | Retorna todas as tarefas de uma lista específica. |
| <kbd>POST</kbd> /lists/:listId/tasks           | Adiciona uma nova tarefa em uma lista.            |
| <kbd>PATCH</kbd> /lists/:listId/tasks/:taskId  | Atualiza o status de uma tarefa em uma lista.     |
| <kbd>DELETE</kbd> /lists/:listId/tasks/:taskId | Deleta uma tarefa de uma lista.                   |

---

### Exemplos

<kbd>**GET /lists**</kbd>

**Resposta:**

```json
[
  {
    "id": "452edca5-4e2d-4d8a-a3f4-8ef17f8e2bf7",
    "title": "Lista de Compras",
    "totalTasks": 1,
    "tasks": [
      {
        "id": "4c62f192-538d-40fa-a6c4-fa636210cebd",
        "description": "Comprar leite",
        "isCompleted": false
      }
    ]
  },
  {
    "id": "7c3d6237-5ea3-4c7f-9e71-a57562ee3d3b",
    "title": "Projetos do Trabalho",
    "totalTasks": 0,
    "tasks": []
  }
]
```

---

<kbd>**POST /lists**</kbd>

**Corpo da Requisição:**

```json
{
  "title": "Nova Lista"
}
```

**Resposta:**

```json
{
  "id": "58f10d41-4c91-4083-908d-0f5287ba87ac",
  "title": "Nova Lista",
  "totalTasks": 0
}
```

---

<kbd>**PATCH /lists/58f10d41-4c91-4083-908d-0f5287ba87ac**</kbd>

**Corpo da Requisição:**

```json
{
  "newTitle": "Título da lista atualizado"
}
```

**Resposta:**

```json
{
  "id": "58f10d41-4c91-4083-908d-0f5287ba87ac",
  "title": "Título da lista atualizado",
  "totalTasks": 0
}
```

---

<kbd>**DELETE /lists/58f10d41-4c91-4083-908d-0f5287ba87ac**</kbd>

**Resposta:**

```json
{ "message": "The list has been successfully deleted." }
```

---

<kbd>**GET /lists/452edca5-4e2d-4d8a-a3f4-8ef17f8e2bf7/tasks**</kbd>

**Resposta:**

```json
[
  {
    "id": "4c62f192-538d-40fa-a6c4-fa636210cebd",
    "description": "Comprar leite",
    "isCompleted": false
  }
]
```

---

<kbd>**POST /lists/4c62f192-538d-40fa-a6c4-fa636210cebd/tasks**</kbd>

**Corpo da Requisição:**

```json
{
  "description": "Comprar Pão"
}
```

**Resposta:**

```json
{
  "id": "20e1b40e-4b4d-479a-9834-5449d75c7af4",
  "description": "Comprar Pão",
  "isCompleted": false,
  "listId": "4c62f192-538d-40fa-a6c4-fa636210cebd"
}
```

---

<kbd>**PATCH /lists/452edca5-4e2d-4d8a-a3f4-8ef17f8e2bf7/tasks/20e1b40e-4b4d-479a-9834-5449d75c7af4**</kbd>

**Resposta:**

```json
{
  "id": "20e1b40e-4b4d-479a-9834-5449d75c7af4",
  "description": "Comprar Pão",
  "isCompleted": true,
  "listId": "4c62f192-538d-40fa-a6c4-fa636210cebd"
}
```

---

<kbd>**DELETE /lists/452edca5-4e2d-4d8a-a3f4-8ef17f8e2bf7/tasks/20e1b40e-4b4d-479a-9834-5449d75c7af4**</kbd>

**Resposta:**

```json
{ "message": "The task has been successfully deleted." }
```
