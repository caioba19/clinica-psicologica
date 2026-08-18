import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PerfilUsuario } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, loginAs } = useAuth();

  const handlePerfilChange = (novoPerfil: PerfilUsuario) => {
    loginAs(novoPerfil);
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        style={{ display: isOpen ? 'block' : undefined }}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🧠</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">PsicoManager</span>
            <span className="sidebar-logo-subtitle">
              {user.perfil === 'administrador'
                ? 'Painel Administrativo'
                : user.perfil === 'paciente'
                ? 'Portal do Paciente'
                : 'Gestão Psicológica'}
            </span>
          </div>
        </div>

        {/* Seletor Rápido de Perfil (Para visualização e testes em tempo real) */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Visualizando como:
          </label>
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              className={`btn btn-sm ${user.perfil === 'psicologo' ? 'btn-primary' : 'btn-dark'}`}
              style={{ fontSize: '11px', padding: '4px 6px' }}
              onClick={() => handlePerfilChange('psicologo')}
              title="Visão do Psicólogo"
            >
              Psicólogo
            </button>
            <button
              type="button"
              className={`btn btn-sm ${user.perfil === 'administrador' ? 'btn-primary' : 'btn-dark'}`}
              style={{ fontSize: '11px', padding: '4px 6px' }}
              onClick={() => handlePerfilChange('administrador')}
              title="Visão do Administrador"
            >
              Admin
            </button>
            <button
              type="button"
              className={`btn btn-sm ${user.perfil === 'paciente' ? 'btn-primary' : 'btn-dark'}`}
              style={{ fontSize: '11px', padding: '4px 6px' }}
              onClick={() => handlePerfilChange('paciente')}
              title="Visão do Paciente"
            >
              Paciente
            </button>
          </div>
        </div>

        {/* Menu Dinâmico Conforme o Perfil */}
        <nav className="sidebar-nav">
          {/* VISÃO DO PACIENTE */}
          {user.perfil === 'paciente' ? (
            <>
              <p className="nav-section-label">Meu Atendimento</p>
              <div className="nav-item">
                <NavLink
                  to="/paciente/portal"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-grid-1x2 nav-icon"></i>
                  <span>Minhas Consultas</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/agenda"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-calendar3 nav-icon"></i>
                  <span>Horários & Sessões</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Documentos & Cadastro</p>
              <div className="nav-item">
                <NavLink
                  to="/perfil"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-person-circle nav-icon"></i>
                  <span>Meus Dados</span>
                </NavLink>
              </div>
            </>
          ) : user.perfil === 'administrador' ? (
            /* VISÃO DO ADMINISTRADOR */
            <>
              <p className="nav-section-label">Administração Geral</p>
              <div className="nav-item">
                <NavLink
                  to="/admin/usuarios"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-shield-lock nav-icon"></i>
                  <span>Usuários & Acessos</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/dashboard"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-speedometer2 nav-icon"></i>
                  <span>Visão da Clínica</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Gestão Clínica</p>
              <div className="nav-item">
                <NavLink
                  to="/pacientes"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-people nav-icon"></i>
                  <span>Todos os Pacientes</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/agenda"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-calendar3 nav-icon"></i>
                  <span>Grade Geral</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/financeiro"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-cash-coin nav-icon"></i>
                  <span>Financeiro Geral</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/relatorios"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-bar-chart-line nav-icon"></i>
                  <span>Relatórios & Auditoria</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Configuração</p>
              <div className="nav-item">
                <NavLink
                  to="/configuracoes"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-gear nav-icon"></i>
                  <span>Parâmetros do Sistema</span>
                </NavLink>
              </div>
            </>
          ) : (
            /* VISÃO DO PSICÓLOGO */
            <>
              <p className="nav-section-label">Principal</p>
              <div className="nav-item">
                <NavLink
                  to="/dashboard"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-grid-1x2 nav-icon"></i>
                  <span>Dashboard Clínico</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/agenda"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-calendar3 nav-icon"></i>
                  <span>Minha Agenda</span>
                  <span className="nav-badge">5</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Prontuários & Pacientes</p>
              <div className="nav-item">
                <NavLink
                  to="/pacientes"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-people nav-icon"></i>
                  <span>Meus Pacientes</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/sessoes"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-journal-medical nav-icon"></i>
                  <span>Prontuários & Evoluções</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Gestão Profissional</p>
              <div className="nav-item">
                <NavLink
                  to="/financeiro"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-cash-coin nav-icon"></i>
                  <span>Financeiro</span>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  to="/relatorios"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-bar-chart-line nav-icon"></i>
                  <span>Relatórios Clínicos</span>
                </NavLink>
              </div>

              <p className="nav-section-label">Sistema</p>
              <div className="nav-item">
                <NavLink
                  to="/perfil"
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className="bi bi-person-circle nav-icon"></i>
                  <span>Meu Perfil</span>
                </NavLink>
              </div>
            </>
          )}
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="sidebar-footer">
          <div className="d-flex align-items-center justify-content-between">
            <NavLink to="/perfil" className="sidebar-user text-decoration-none flex-grow-1" onClick={onClose}>
              <div className="sidebar-user-avatar">{user.avatarText || 'DS'}</div>
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user.name}</p>
                <p className="sidebar-user-role">
                  {user.perfil === 'administrador'
                    ? 'Administrador'
                    : user.perfil === 'paciente'
                    ? 'Paciente'
                    : `CRP ${user.crp || '06/123456'}`}
                </p>
              </div>
            </NavLink>
            <NavLink
              to="/login"
              className="action-btn text-white bg-transparent border-0 ms-2"
              title="Sair / Fazer Logout"
              onClick={onClose}
            >
              <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
