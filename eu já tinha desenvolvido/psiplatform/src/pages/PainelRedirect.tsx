import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PainelRedirect() {
  const { usuarioAtual } = useAuth();

  if (!usuarioAtual) return <Navigate to="/" replace />;

  return usuarioAtual.perfil === "administrador" ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/psicologo" replace />
  );
}
