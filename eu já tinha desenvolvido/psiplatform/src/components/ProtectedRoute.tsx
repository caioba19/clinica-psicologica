import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Perfil } from "../types";

export default function ProtectedRoute({
  children,
  perfisPermitidos,
}: {
  children: ReactNode;
  perfisPermitidos?: Perfil[];
}) {
  const { usuarioAtual } = useAuth();

  if (!usuarioAtual) {
    return <Navigate to="/" replace />;
  }

  if (perfisPermitidos && !perfisPermitidos.includes(usuarioAtual.perfil)) {
    return <Navigate to="/painel" replace />;
  }

  return <>{children}</>;
}
