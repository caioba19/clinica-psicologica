import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { UsuarioSistema, PsicologoProfissional, LogAuditoria } from '../../types';
import { useToast } from '../../context/ToastContext';
import { maskCRP } from '../../utils/masks';

export const AdminUsuariosPage: React.FC = () => {
  const { showToast, confirmAction } = useToast();

  const [activeTab, setActiveTab] = useState<'usuarios' | 'psicologos' | 'logs'>('usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoLogFilter, setTipoLogFilter] = useState<'todos' | 'acesso' | 'cadastro' | 'prontuario'>('todos');

  const [usuarios, setUsuarios] = useState<UsuarioSistema[]>([
    { id: 'u1', nome: 'Renata Farias', email: 'renata@clinica.com', perfil: 'administrador', situacao: 'ativo', criadoEm: '10/01/2026' },
    { id: 'u2', nome: 'Marcelo Andrade', email: 'marcelo@clinica.com', perfil: 'psicologo', situacao: 'ativo', criadoEm: '03/02/2026' },
    { id: 'u3', nome: 'Juliana Prado', email: 'juliana@clinica.com', perfil: 'psicologo', situacao: 'ativo', criadoEm: '14/02/2026' },
    { id: 'u4', nome: 'Diego Ramos', email: 'diego@clinica.com', perfil: 'psicologo', situacao: 'inativo', criadoEm: '01/03/2026' },
    { id: 'u5', nome: 'Bianca Souza', email: 'bianca@clinica.com', perfil: 'psicologo', situacao: 'bloqueado', criadoEm: '20/03/2026' }
  ]);

  const [psicologos, setPsicologos] = useState<PsicologoProfissional[]>([
    { id: 'p1', usuarioId: 'u2', nome: 'Marcelo Andrade', email: 'marcelo@clinica.com', areaAtuacao: 'Psicologia Clínica (TCC)', registroCrp: 'CRP 03/12345', situacao: 'ativo' },
    { id: 'p2', usuarioId: 'u3', nome: 'Juliana Prado', email: 'juliana@clinica.com', areaAtuacao: 'Organizacional e do Trabalho', registroCrp: 'CRP 03/54321', situacao: 'ativo' },
    { id: 'p3', usuarioId: 'u4', nome: 'Diego Ramos', email: 'diego@clinica.com', areaAtuacao: 'Escolar e Educacional', registroCrp: 'CRP 03/98765', situacao: 'inativo' }
  ]);

  const [logs, setLogs] = useState<LogAuditoria[]>([
    { id: 'l1', autor: 'Renata Farias (Admin)', acao: 'Bloqueou o acesso de Bianca Souza por pendência cadastral', dataHora: '17/08/2026 às 10:22' },
    { id: 'l2', autor: 'Renata Farias (Admin)', acao: 'Cadastrou o psicólogo Diego Ramos no sistema', dataHora: '10/08/2026 às 16:05' },
    { id: 'l3', autor: 'Marcelo Andrade (Psi)', acao: 'Atualizou prontuário de Carla Menezes', dataHora: '09/08/2026 às 08:41' },
    { id: 'l4', autor: 'Sistema (Autenticação)', acao: 'Tentativa de login com senha incorreta: marcelo@clinica.com', dataHora: '08/08/2026 às 14:12' }
  ]);

  const [modalNovoOpen, setModalNovoOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoPerfil, setNovoPerfil] = useState<'administrador' | 'psicologo'>('psicologo');
  const [novoCrp, setNovoCrp] = useState('');
  const [novaArea, setNovaArea] = useState('Psicologia Clínica (TCC)');

  const totalAtivos = usuarios.filter((u) => u.situacao === 'ativo').length;
  const totalBloqueados = usuarios.filter((u) => u.situacao === 'bloqueado').length;

  const alternarSituacao = (id: string, nome: string, situacaoAtual: 'ativo' | 'inativo' | 'bloqueado') => {
    const novaSituacao = situacaoAtual === 'ativo' ? 'bloqueado' : 'ativo';
    const acaoTexto = novaSituacao === 'bloqueado' ? 'bloquear' : 'desbloquear/ativar';

    confirmAction(`Deseja realmente ${acaoTexto} o acesso de ${nome}?`, () => {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, situacao: novaSituacao } : u))
      );

      const novoLog: LogAuditoria = {
        id: Math.random().toString(),
        autor: 'Renata Farias (Admin)',
        acao: `${novaSituacao === 'bloqueado' ? 'Bloqueou' : 'Liberou'} o acesso de ${nome}`,
        dataHora: 'Agora mesmo'
      };
      setLogs([novoLog, ...logs]);
      showToast(`Situação de ${nome} alterada para ${novaSituacao}.`, 'success');
    });
  };

  const handleCriarUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome || !novoEmail) {
      showToast('Preencha os campos obrigatórios (*)', 'warning');
      return;
    }

    const novoId = 'u' + (usuarios.length + 1);
    const novoUsuario: UsuarioSistema = {
      id: novoId,
      nome: novoNome,
      email: novoEmail,
      perfil: novoPerfil,
      situacao: 'ativo',
      criadoEm: 'Hoje'
    };

    setUsuarios([...usuarios, novoUsuario]);

    if (novoPerfil === 'psicologo') {
      const novoPsi: PsicologoProfissional = {
        id: 'p' + (psicologos.length + 1),
        usuarioId: novoId,
        nome: novoNome,
        email: novoEmail,
        areaAtuacao: novaArea,
        registroCrp: novoCrp || 'CRP 06/99999',
        situacao: 'ativo'
      };
      setPsicologos([...psicologos, novoPsi]);
    }

    const novoLog: LogAuditoria = {
      id: Math.random().toString(),
      autor: 'Renata Farias (Admin)',
      acao: `Cadastrou o novo usuário ${novoNome} (${novoPerfil})`,
      dataHora: 'Agora mesmo'
    };
    setLogs([novoLog, ...logs]);

    showToast(`Usuário ${novoNome} cadastrado com sucesso!`, 'success');
    setModalNovoOpen(false);
    setNovoNome('');
    setNovoEmail('');
    setNovoCrp('');
  };

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.perfil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPsicologos = psicologos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.areaAtuacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.registroCrp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = logs.filter((l) => {
    const matchSearch =
      l.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.autor.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;

    if (tipoLogFilter === 'acesso') return l.acao.toLowerCase().includes('bloqueou') || l.acao.toLowerCase().includes('liberou') || l.acao.toLowerCase().includes('login');
    if (tipoLogFilter === 'cadastro') return l.acao.toLowerCase().includes('cadastrou');
    if (tipoLogFilter === 'prontuario') return l.acao.toLowerCase().includes('prontuário') || l.acao.toLowerCase().includes('laudo');
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestão de Usuários & Acessos</h1>
          <p className="page-subtitle">Controle de perfis (Admin / Psicólogo), permissões e auditoria de ações (Requisito AV3)</p>
        </div>
        <button className="btn-accent" onClick={() => setModalNovoOpen(true)}>
          <i className="bi bi-person-plus me-1"></i> Novo Usuário
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid-4 mb-24">
        <StatCard
          title="Contas Ativas"
          value={totalAtivos}
          change={`${usuarios.length} cadastrados no total`}
          changeType="up"
          icon="shield-check"
          color="green"
        />
        <StatCard
          title="Psicólogos Credenciados"
          value={psicologos.length}
          change="Clínica, Escolar, Org."
          changeType="up"
          icon="person-badge"
          color="teal"
        />
        <StatCard
          title="Contas Bloqueadas"
          value={totalBloqueados}
          change="Acesso restrito"
          changeType="down"
          icon="lock"
          color="red"
        />
        <StatCard
          title="Ações Auditadas"
          value={logs.length}
          change="Rastreabilidade 100%"
          changeType="up"
          icon="activity"
          color="blue"
        />
      </div>

      {/* Navegação por Abas */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div className="d-inline-flex p-1 bg-white border rounded-3 shadow-sm">
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'usuarios' ? 'btn-primary' : 'btn-ghost border-0'}`}
            style={{ fontWeight: 600, fontSize: '13px', borderRadius: '6px' }}
            onClick={() => setActiveTab('usuarios')}
          >
            <i className="bi bi-people me-1"></i> Usuários ({usuarios.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'psicologos' ? 'btn-primary' : 'btn-ghost border-0'}`}
            style={{ fontWeight: 600, fontSize: '13px', borderRadius: '6px' }}
            onClick={() => setActiveTab('psicologos')}
          >
            <i className="bi bi-person-badge me-1"></i> Corpo Clínico ({psicologos.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'logs' ? 'btn-primary' : 'btn-ghost border-0'}`}
            style={{ fontWeight: 600, fontSize: '13px', borderRadius: '6px' }}
            onClick={() => setActiveTab('logs')}
          >
            <i className="bi bi-clock-history me-1"></i> Logs de Auditoria ({logs.length})
          </button>
        </div>

        {/* Campo de Busca Rápida */}
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ width: '260px' }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control form-control-sm ps-5"
              placeholder="Buscar registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setSearchTerm('')}
              title="Limpar busca"
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* ABA 1: USUÁRIOS */}
      {activeTab === 'usuarios' && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="card-title">Usuários & Credenciais do Sistema</h3>
            <span className="text-muted small">Total: {filteredUsuarios.length}</span>
          </div>
          {filteredUsuarios.length === 0 ? (
            <EmptyState
              icon="bi-people"
              title="Nenhum usuário encontrado"
              description="Não encontramos nenhum usuário com os termos pesquisados."
              actionText="Limpar Busca"
              onAction={() => setSearchTerm('')}
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '20px' }}>Nome</th>
                    <th>E-mail</th>
                    <th>Perfil de Acesso</th>
                    <th>Situação</th>
                    <th>Criado Em</th>
                    <th className="text-end" style={{ paddingRight: '20px' }}>Ação Administrativa</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.map((u) => (
                    <tr key={u.id}>
                      <td style={{ paddingLeft: '20px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: u.perfil === 'administrador' ? '#2c5f6e' : '#5cb8a8',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 700
                            }}
                          >
                            {u.nome.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <strong>{u.nome}</strong>
                        </div>
                      </td>
                      <td className="text-secondary">{u.email}</td>
                      <td>
                        <span className={`badge ${u.perfil === 'administrador' ? 'badge-primary' : 'badge-info'}`}>
                          {u.perfil.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            u.situacao === 'ativo'
                              ? 'badge-success'
                              : u.situacao === 'bloqueado'
                              ? 'badge-danger'
                              : 'badge-warning'
                          }`}
                        >
                          {u.situacao.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-muted small">{u.criadoEm}</td>
                      <td className="text-end" style={{ paddingRight: '20px' }}>
                        {u.perfil !== 'administrador' ? (
                          <button
                            type="button"
                            className={`btn btn-sm ${u.situacao === 'ativo' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px' }}
                            onClick={() => alternarSituacao(u.id, u.nome, u.situacao)}
                          >
                            {u.situacao === 'ativo' ? 'Bloquear Acesso' : 'Liberar Acesso'}
                          </button>
                        ) : (
                          <span className="text-muted small">Admin Geral</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ABA 2: PSICÓLOGOS */}
      {activeTab === 'psicologos' && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="card-title">Corpo Clínico & Áreas de Atuação</h3>
            <span className="text-muted small">Total: {filteredPsicologos.length}</span>
          </div>
          {filteredPsicologos.length === 0 ? (
            <EmptyState
              icon="bi-person-badge"
              title="Nenhum psicólogo encontrado"
              description="Nenhum profissional corresponde ao termo buscado."
              actionText="Limpar Busca"
              onAction={() => setSearchTerm('')}
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '20px' }}>Profissional</th>
                    <th>Registro Profissional</th>
                    <th>Área de Atuação</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPsicologos.map((p) => (
                    <tr key={p.id}>
                      <td style={{ paddingLeft: '20px' }}>
                        <strong>{p.nome}</strong>
                        <span className="d-block text-muted small">{p.email}</span>
                      </td>
                      <td><span className="badge badge-info">{p.registroCrp}</span></td>
                      <td>{p.areaAtuacao}</td>
                      <td>
                        <span className={`badge ${p.situacao === 'ativo' ? 'badge-success' : 'badge-warning'}`}>
                          {p.situacao.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ABA 3: LOGS DE AUDITORIA */}
      {activeTab === 'logs' && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h3 className="card-title mb-0">
              <i className="bi bi-shield-check text-success me-2"></i>Logs de Auditoria do Sistema (`/api/audit-logs`)
            </h3>
            
            {/* Filtros de Categoria de Log */}
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${tipoLogFilter === 'todos' ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ fontSize: '11.5px', padding: '3px 8px' }}
                onClick={() => setTipoLogFilter('todos')}
              >
                Todos
              </button>
              <button
                type="button"
                className={`btn btn-sm ${tipoLogFilter === 'acesso' ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ fontSize: '11.5px', padding: '3px 8px' }}
                onClick={() => setTipoLogFilter('acesso')}
              >
                Acessos & Bloqueios
              </button>
              <button
                type="button"
                className={`btn btn-sm ${tipoLogFilter === 'cadastro' ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ fontSize: '11.5px', padding: '3px 8px' }}
                onClick={() => setTipoLogFilter('cadastro')}
              >
                Cadastros
              </button>
              <button
                type="button"
                className={`btn btn-sm ${tipoLogFilter === 'prontuario' ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ fontSize: '11.5px', padding: '3px 8px' }}
                onClick={() => setTipoLogFilter('prontuario')}
              >
                Prontuários
              </button>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <EmptyState
              icon="bi-journal-check"
              title="Nenhum log correspondente"
              description="Não foram encontradas ações registradas com os filtros atuais."
              actionText="Resetar Filtros"
              onAction={() => { setTipoLogFilter('todos'); setSearchTerm(''); }}
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '20px' }}>Autor da Ação</th>
                    <th>Operação Auditada</th>
                    <th className="text-end" style={{ paddingRight: '20px' }}>Data e Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((l) => (
                    <tr key={l.id}>
                      <td style={{ paddingLeft: '20px' }}>
                        <span className="badge badge-primary me-2" style={{ fontSize: '10px' }}>LOG</span>
                        <strong>{l.autor}</strong>
                      </td>
                      <td style={{ fontSize: '13px' }}>{l.acao}</td>
                      <td className="text-end text-muted small" style={{ paddingRight: '20px' }}>
                        {l.dataHora}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Novo Usuário */}
      {modalNovoOpen && (
        <div className="modal-backdrop-custom open" onClick={() => setModalNovoOpen(false)}>
          <div className="modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Cadastrar Novo Usuário</h2>
              <button className="action-btn" type="button" onClick={() => setModalNovoOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleCriarUsuario}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Carlos Eduardo Silva"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    required
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">E-mail de Acesso *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="usuario@clinica.com"
                      value={novoEmail}
                      onChange={(e) => setNovoEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Perfil de Acesso *</label>
                    <select
                      className="form-select"
                      value={novoPerfil}
                      onChange={(e) => setNovoPerfil(e.target.value as any)}
                    >
                      <option value="psicologo">Psicólogo</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </div>
                </div>

                {novoPerfil === 'psicologo' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Registro CRP *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CRP 06/123456"
                        value={novoCrp}
                        onChange={(e) => setNovoCrp(maskCRP(e.target.value))}
                        maxLength={13}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Área de Atuação</label>
                      <select className="form-select" value={novaArea} onChange={(e) => setNovaArea(e.target.value)}>
                        <option value="Psicologia Clínica (TCC)">Psicologia Clínica (TCC)</option>
                        <option value="Psicanálise">Psicanálise</option>
                        <option value="Organizacional e do Trabalho">Organizacional e do Trabalho</option>
                        <option value="Escolar e Educacional">Escolar e Educacional</option>
                        <option value="Hospitalar / Saúde">Hospitalar / Saúde</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={() => setModalNovoOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-accent">
                  <i className="bi bi-check-lg me-1"></i> Concluir Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
