function NotFound() {
  return (
    <div className="container">
      <div className="login-card">
        <h1>404</h1>

        <p>Página não encontrada.</p>

        <button onClick={() => (window.location.href = "/")}>
          Voltar para o Login
        </button>
      </div>
    </div>
  );
}

export default NotFound;