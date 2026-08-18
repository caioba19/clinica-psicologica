import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { QuickActionModal } from './QuickActionModal';

const routeTitles: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Visão Geral' },
  '/agenda': { title: 'Agenda', subtitle: 'Consultas e Horários' },
  '/pacientes': { title: 'Pacientes', subtitle: 'Lista de Pacientes' },
  '/pacientes/novo': { title: 'Pacientes', subtitle: 'Novo Cadastro' },
  '/sessoes': { title: 'Sessões', subtitle: 'Prontuários & Evoluções' },
  '/financeiro': { title: 'Financeiro', subtitle: 'Fluxo de Caixa' },
  '/relatorios': { title: 'Relatórios', subtitle: 'Indicadores & Estatísticas' },
  '/perfil': { title: 'Meu Perfil', subtitle: 'Dados Profissionais' },
  '/configuracoes': { title: 'Configurações', subtitle: 'Preferências do Sistema' }
};

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const location = useLocation();

  const currentRouteInfo = routeTitles[location.pathname] || {
    title: 'PsicoManager',
    subtitle: 'Painel'
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Topbar
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenQuickModal={() => setQuickModalOpen(true)}
        title={currentRouteInfo.title}
        subtitle={currentRouteInfo.subtitle}
      />

      <main className="main-content">
        <Outlet />
      </main>

      <QuickActionModal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
      />
    </div>
  );
};
