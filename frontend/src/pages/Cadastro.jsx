import { useState } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleCadastro(event) {
    event.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }

    const resposta = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha
      })
    });

    const dados = await resposta.json();

    setMensagem(dados.mensagem);

    if (resposta.ok) {
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    }
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Criar conta</h1>

        <p>Preencha os dados abaixo</p>

        <form onSubmit={handleCadastro}>
          <label>Nome</label>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

          <label>E-mail</label>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Senha</label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <label>Confirmar senha</label>

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <p className="register">
            {mensagem}
          </p>
        )}

        <p className="register">
          Já possui uma conta?{" "}
          <a href="/">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;