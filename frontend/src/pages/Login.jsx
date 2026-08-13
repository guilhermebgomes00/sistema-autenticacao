import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !senha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      setMensagem(dados.mensagem);
      return;
    }

    // Guarda o token recebido do backend
    localStorage.setItem("token", dados.token);

    // Guarda os dados do usuário
    localStorage.setItem(
      "usuario",
      JSON.stringify(dados.usuario)
    );

    window.location.href = "/dashboard";
  }

  return (
    <div className="container">
      <div className="login-card">

        <h1>Bem-vindo</h1>

        <p>Entre na sua conta para continuar</p>

        <form onSubmit={handleLogin}>

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

          <button type="submit">
            Entrar
          </button>

        </form>

        {mensagem && (
          <p className="register">
            {mensagem}
          </p>
        )}

        <p className="register">
          Ainda não possui uma conta?{" "}
          <a href="/cadastro">Cadastre-se</a>
        </p>

      </div>
    </div>
  );
}

export default Login;