import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

type PerfilAcesso = "administrador" | "psicologo";

const emailSugerido: Record<PerfilAcesso, string> = {
  administrador: "renata@clinica.com",
  psicologo: "marcelo@clinica.com",
};

export default function Login() {
  const { login, erro, usuarioAtual } = useAuth();
  const [perfil, setPerfil] = useState<PerfilAcesso>("administrador");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(email, senha)) navigate("/painel");
  }

  function selecionarPerfil(p: PerfilAcesso) {
    setPerfil(p);
    setEmail("");
    setSenha("");
  }

  if (usuarioAtual) {
    return <Navigate to="/painel" replace />;
  }

  return (
    <div className="login-screen">
      <div className="login-topbar-accent" />

      <header className="login-topbar">
        <span className="login-brand">Ânima<span>painel</span></span>
        <span className="login-topbar-tag">Plataforma de Gestão Clínica</span>
      </header>

      <main className="login-main">
        <h1 className="login-heading">Faça seu acesso</h1>

        <div className="login-card">
          <div className="login-role-toggle" role="tablist" aria-label="Tipo de acesso">
            <button
              type="button"
              role="tab"
              aria-selected={perfil === "administrador"}
              className={"login-role-btn" + (perfil === "administrador" ? " is-active" : "")}
              onClick={() => selecionarPerfil("administrador")}
            >
              Administrador
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={perfil === "psicologo"}
              className={"login-role-btn" + (perfil === "psicologo" ? " is-active" : "")}
              onClick={() => selecionarPerfil("psicologo")}
            >
              Psicólogo(a)
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>E-mail*</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailSugerido[perfil]}
                required
              />
            </label>

            <label className="login-field">
              <span>Senha*</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </label>

            {erro && <p className="login-error">{erro}</p>}

            <button type="submit" className="login-button">Entrar</button>
          </form>

          <p className="login-hint">
            Demonstração — {perfil === "administrador" ? "admin: renata@clinica.com / admin123" : "psicólogo: marcelo@clinica.com / psi123"}
          </p>
        </div>
      </main>
    </div>
  );
}
