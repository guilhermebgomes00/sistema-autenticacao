import { useEffect, useState } from "react";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function verificarToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/";
        return;
      }

      const resposta = await fetch("http://localhost:3000/perfil", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!resposta.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        window.location.href = "/";
        return;
      }

      const dados = await resposta.json();

      setUsuario(dados.usuario);
      setCarregando(false);
    }

    verificarToken();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  if (carregando) {
    return (
      <div className="container">
        <div className="login-card">
          <h1>Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-card">
        <h1>Dashboard</h1>

        <p>Bem-vindo, {usuario.nome}!</p>

        <p>Você está logado no sistema.</p>

        <button onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Dashboard;