#Sistema de Autenticação Full Stack

Projeto de autenticação de usuários desenvolvido para demonstrar conhecimentos em desenvolvimento **Frontend, Backend, Banco de Dados e Segurança**.

O sistema possui cadastro, login, criptografia de senhas, autenticação com JWT e proteção de rotas.

## Tecnologias utilizadas

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express
- CORS

### Banco de dados
- SQLite
- better-sqlite3

### Segurança
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Funcionalidades

- [x] Cadastro de usuários
- [x] Login
- [x] Validação de e-mail e senha
- [x] Criptografia de senhas com bcrypt
- [x] Geração de tokens JWT
- [x] Validação de tokens
- [x] Proteção do Dashboard
- [x] Logout
- [x] Banco de dados SQLite
- [x] Variáveis de ambiente com `.env`

## Estrutura do projeto


sistema-autenticacao/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Cadastro.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md

Funcionamento
Cadastro

O usuário informa:

Nome
E-mail
Senha

A senha é criptografada utilizando bcrypt antes de ser armazenada no banco de dados.

Login

O usuário informa seu e-mail e senha.

O backend:

Procura o usuário no banco de dados.
Compara a senha utilizando bcrypt.
Gera um token JWT.
Envia o token para o frontend.
Proteção

O frontend armazena o token e o envia para o backend quando precisa verificar a autenticação.

O backend utiliza jwt.verify() para verificar se o token é válido.

Como executar o projeto
1. Clone o repositório
git clone URL_DO_REPOSITORIO
2. Entre na pasta
cd sistema-autenticacao
3. Instale as dependências do backend
cd backend
npm install
4. Configure o arquivo .env

Dentro da pasta backend, crie um arquivo chamado .env:

JWT_SECRET=minha_chave_secreta
5. Inicie o backend
node server.js

O servidor será executado em:

http://localhost:3000
6. Abra outro terminal

Entre na pasta do frontend:

cd frontend

Instale as dependências:

npm install

Depois execute:

npm run dev

O frontend estará disponível em:

http://localhost:5173
Segurança

Este projeto utiliza algumas práticas básicas de segurança:

Senhas não são armazenadas em texto puro.
As senhas são protegidas utilizando bcrypt.
A autenticação utiliza tokens JWT.
A chave utilizada para assinar os tokens fica em uma variável de ambiente.
O arquivo .env não é enviado para o GitHub através do .gitignore.
Objetivo do projeto

Este projeto foi desenvolvido como parte do meu portfólio para demonstrar conhecimentos práticos em desenvolvimento web Full Stack.

O principal objetivo é demonstrar a integração entre:

Frontend → API → Backend → Banco de Dados

e conceitos básicos de autenticação e segurança.

Projeto desenvolvido para fins de estudo e portfólio.