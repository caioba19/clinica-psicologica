import { createContext, useContext, useState, type ReactNode } from "react";
import { usuarios, credenciais } from "../mockData";
import type { Usuario } from "../types";

interface AuthContextValue {
  usuarioAtual: Usuario | null;
  erro: string | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function login(email: string, senha: string): boolean {
    const cred = credenciais[email.toLowerCase().trim()];
    if (!cred || cred.senha !== senha) {
      setErro("E-mail ou senha inválidos.");
      return false;
    }
    const user = usuarios.find((u) => u.id === cred.usuarioId) ?? null;
    if (!user) {
      setErro("Usuário não encontrado.");
      return false;
    }
    if (user.situacao !== "ativo") {
      setErro("Acesso negado: usuário " + user.situacao + ".");
      return false;
    }
    setErro(null);
    setUsuarioAtual(user);
    return true;
  }

  function logout() {
    setUsuarioAtual(null);
  }

  return (
    <AuthContext.Provider value={{ usuarioAtual, erro, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
