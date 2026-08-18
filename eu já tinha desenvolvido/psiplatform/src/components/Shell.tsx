import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Shell.css";

interface ShellProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  children: ReactNode;
}

export default function Shell({ title, subtitle, kicker, children }: ShellProps) {
  const { usuarioAtual, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <div className="shell-brand">
          <span className="shell-brand-mark" />
          <span className="shell-brand-name">Ânima<span>painel</span></span>
        </div>

        <div className="shell-user">
          <div className="shell-user-avatar">{usuarioAtual?.nome.charAt(0) ?? "?"}</div>
          <div>
            <p className="shell-user-name">{usuarioAtual?.nome}</p>
            <p className="shell-user-role">
              {usuarioAtual?.perfil === "administrador" ? "Administrador" : "Psicólogo(a)"}
            </p>
          </div>
        </div>

        {usuarioAtual?.perfil === "administrador" && (
          <nav className="shell-nav">
            <NavLink to="/admin" end className={({ isActive }) => "shell-nav-link" + (isActive ? " is-active" : "")}>
              Painel
            </NavLink>
            <NavLink to="/admin/pacientes" className={({ isActive }) => "shell-nav-link" + (isActive ? " is-active" : "")}>
              Pacientes
            </NavLink>
          </nav>
        )}

        <button className="shell-logout" onClick={handleLogout}>Sair</button>
      </aside>

      <main className="shell-main">
        <header className="shell-header">
          {kicker && <span className="shell-header-kicker">{kicker}</span>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </header>
        <div className="shell-content">{children}</div>
      </main>
    </div>
  );
}
