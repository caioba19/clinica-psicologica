import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import PainelRedirect from "./pages/PainelRedirect";
import AdminDashboard from "./pages/AdminDashboard";
import PsychologistArea from "./pages/PsychologistArea";
import Patients from "./pages/Patients";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/painel" element={<ProtectedRoute><PainelRedirect /></ProtectedRoute>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute perfisPermitidos={["administrador"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pacientes"
            element={
              <ProtectedRoute perfisPermitidos={["administrador"]}>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/psicologo"
            element={
              <ProtectedRoute perfisPermitidos={["psicologo"]}>
                <PsychologistArea />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
