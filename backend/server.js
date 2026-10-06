require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("banco.db");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("ERRO: JWT_SECRET não foi configurado no arquivo .env");
  process.exit(1);
}

// Criar tabela de usuários
db.prepare(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`).run();

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "Backend funcionando!"
  });
});

// Cadastro

app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Preencha todos os campos."
    });
  }

  const usuarioExistente = db
    .prepare("SELECT * FROM usuarios WHERE email = ?")
    .get(email);

  if (usuarioExistente) {
    return res.status(400).json({
      mensagem: "Este e-mail já está cadastrado."
    });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  db.prepare(`
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)
  `).run(nome, email, senhaCriptografada);

  res.status(201).json({
    mensagem: "Cadastro realizado com sucesso!"
  });
});

// Login

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Preencha todos os campos."
    });
  }

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE email = ?")
    .get(email);

  if (!usuario) {
    return res.status(401).json({
      mensagem: "E-mail ou senha incorretos."
    });
  }

  const senhaCorreta = await bcrypt.compare(
    senha,
    usuario.senha
  );

  if (!senhaCorreta) {
    return res.status(401).json({
      mensagem: "E-mail ou senha incorretos."
    });
  }

  // Criar JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email
    },
    JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.json({
    mensagem: "Login realizado com sucesso!",

    token: token,

    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
});

// Perfil / validar token

app.get("/perfil", (req, res) => {
  const cabecalho = req.headers.authorization;

  if (!cabecalho) {
    return res.status(401).json({
      mensagem: "Token não informado."
    });
  }

  const partes = cabecalho.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      mensagem: "Formato do token inválido."
    });
  }

  const token = partes[1];

  try {
    const usuarioToken = jwt.verify(
      token,
      JWT_SECRET
    );

    const usuario = db
      .prepare(`
        SELECT id, nome, email
        FROM usuarios
        WHERE id = ?
      `)
      .get(usuarioToken.id);

    if (!usuario) {
      return res.status(401).json({
        mensagem: "Usuário não encontrado."
      });
    }

    res.json({
      mensagem: "Token válido!",
      usuario: usuario
    });

  } catch (erro) {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado."
    });
  }
});

// Iniciar servidor

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});