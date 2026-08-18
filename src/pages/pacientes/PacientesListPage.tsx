import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paciente } from '../../types';
import { useToast } from '../../context/ToastContext';
import { EmptyState } from '../../components/common/EmptyState';

export const PacientesListPage: React.FC = () => {
  const { showToast, confirmAction } = useToast();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);

  const [pacientes, setPacientes] = useState<Paciente[]>([
    {
      id: '1',
      nome: 'Lucas Ferreira Mendes',
      email: 'lucas.mendes@email.com',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      dataNasc: '15/04/1992 (34 anos)',
      genero: 'Masculino',
      status: 'Ativo',
      convenio: 'Particular',
      totalSessoes: 12,
      ultimaSessao: '10/08/2026',
      proximaSessao: '17/08/2026 às 09:00',
      avatarColor: '#2c5f6e',
      motivoConsulta: 'Ansiedade generalizada e estresse ocupacional.'
    },
    {
      id: '2',
      nome: 'Beatriz Santos Oliveira',
      email: 'beatriz.santos@email.com',
      telefone: '(11) 97654-3210',
      cpf: '234.567.890-11',
      dataNasc: '22/09/1998 (27 anos)',
      genero: 'Feminino',
      status: 'Ativo',
      convenio: 'Bradesco Saúde',
      totalSessoes: 8,
      ultimaSessao: '12/08/2026',
      proximaSessao: '17/08/2026 às 10:30',
      avatarColor: '#5cb8a8',
      motivoConsulta: 'Sintomas depressivos e transição de carreira.'
    },
    {
      id: '3',
      nome: 'Carlos Eduardo Ramos',
      email: 'carlos.ramos@email.com',
      telefone: '(11) 96543-2109',
      cpf: '345.678.901-22',
      dataNasc: '03/11/1985 (40 anos)',
      genero: 'Masculino',
      status: 'Ativo',
      convenio: 'SulAmérica',
      totalSessoes: 24,
      ultimaSessao: '14/08/2026',
      proximaSessao: '17/08/2026 às 16:00',
      avatarColor: '#f0a500',
      motivoConsulta: 'Acompanhamento psicoterápico continuado.'
    },
    {
      id: '4',
      nome: 'Ana Paula Rodrigues',
      email: 'anapaula.r@email.com',
      telefone: '(11) 95432-1098',
      cpf: '456.789.012-33',
      dataNasc: '18/02/2001 (25 anos)',
      genero: 'Feminino',
      status: 'Ativo',
      convenio: 'Particular',
      totalSessoes: 4,
      ultimaSessao: '08/08/2026',
      proximaSessao: '17/08/2026 às 14:00',
      avatarColor: '#3daa72',
      motivoConsulta: 'Dificuldades de relacionamento interpessoal.'
    },
    {
      id: '5',
      nome: 'Mariana Costa Lima',
      email: 'mariana.costa@email.com',
      telefone: '(11) 94321-0987',
      cpf: '567.890.123-44',
      dataNasc: '30/07/1995 (31 anos)',
      genero: 'Feminino',
      status: 'Inativo',
      convenio: 'Unimed',
      totalSessoes: 16,
      ultimaSessao: '20/07/2026',
      avatarColor: '#e05c5c',
      motivoConsulta: 'Alta clínica temporária.'
    }
  ]);

  const handleDeletePaciente = (id: string, nome: string) => {
    confirmAction(`Deseja realmente inativar o cadastro de ${nome}?`, () => {
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      showToast(`Paciente ${nome} removido/inativado.`, 'success');
      if (selectedPaciente?.id === id) setSelectedPaciente(null);
    });
  };

  const filteredPacientes = pacientes.filter((p) => {
    const matchText = p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.cpf.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchText && matchStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pacientes</h1>
          <p className="page-subtitle">Gerenciamento e prontuários de pacientes cadastrados</p>
        </div>
        <Link to="/pacientes/novo" className="btn-accent">
          <i className="bi bi-person-plus me-1"></i> Novo Paciente
        </Link>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="card mb-4">
        <div className="card-body p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: '450px' }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><i className="bi bi-search text-muted"></i></span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="todos">Todos Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>

            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setViewMode('table')}
              >
                <i className="bi bi-list-ul"></i>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="bi bi-grid"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verificação de Lista Vazia */}
      {filteredPacientes.length === 0 ? (
        <div className="card p-4">
          <EmptyState
            icon="bi-people"
            title="Nenhum paciente encontrado"
            description="Não encontramos pacientes correspondentes aos filtros de busca aplicados."
            actionText="Limpar Filtros"
            onAction={() => { setSearch(''); setStatusFilter('todos'); }}
          />
        </div>
      ) : viewMode === 'table' ? (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '20px' }}>Paciente</th>
                  <th>Contato</th>
                  <th>Convênio</th>
                  <th>Sessões</th>
                  <th>Última Sessão</th>
                  <th>Status</th>
                  <th className="text-end" style={{ paddingRight: '20px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.map((p) => {
                  const initials = p.nome.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
                  return (
                    <tr key={p.id}>
                      <td style={{ paddingLeft: '20px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: p.avatarColor || '#2c5f6e',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 700
                            }}
                          >
                            {initials}
                          </div>
                          <div>
                            <strong className="d-block text-dark">{p.nome}</strong>
                            <span className="text-muted small">{p.cpf}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="d-block">{p.telefone}</span>
                        <span className="text-muted small">{p.email}</span>
                      </td>
                      <td>
                        <span className="badge badge-info">{p.convenio}</span>
                      </td>
                      <td>
                        <strong>{p.totalSessoes}</strong> sessões
                      </td>
                      <td>{p.ultimaSessao}</td>
                      <td>
                        <span className={`badge ${p.status === 'Ativo' ? 'badge-success' : 'badge-warning'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-end" style={{ paddingRight: '20px' }}>
                        <div className="d-inline-flex gap-1">
                          <button
                            type="button"
                            className="action-btn"
                            title="Ver Ficha Completa"
                            onClick={() => setSelectedPaciente(p)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <Link
                            to={`/pacientes/${p.id}/editar`}
                            className="action-btn"
                            title="Editar Cadastro"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            className="action-btn text-danger"
                            title="Inativar/Excluir"
                            onClick={() => handleDeletePaciente(p.id, p.nome)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Visualização em Grid / Cards */
        <div className="row g-3">
          {filteredPacientes.map((p) => {
            const initials = p.nome.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
            return (
              <div key={p.id} className="col-md-6 col-lg-4">
                <div className="card h-100 p-3">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: p.avatarColor || '#2c5f6e',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <h4 className="card-title mb-0" style={{ fontSize: '15px' }}>{p.nome}</h4>
                      <span className="text-muted small">{p.convenio}</span>
                    </div>
                  </div>

                  <div className="mb-3 text-secondary small">
                    <p className="mb-1"><i className="bi bi-telephone me-2 text-muted"></i>{p.telefone}</p>
                    <p className="mb-1"><i className="bi bi-envelope me-2 text-muted"></i>{p.email}</p>
                    <p className="mb-0"><i className="bi bi-journal-check me-2 text-muted"></i>{p.totalSessoes} sessões realizadas</p>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className={`badge ${p.status === 'Ativo' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status}
                    </span>
                    <button
                      className="btn-ghost py-1 px-2"
                      style={{ fontSize: '12px' }}
                      onClick={() => setSelectedPaciente(p)}
                    >
                      Ficha Completa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Ficha do Paciente */}
      {selectedPaciente && (
        <div className="modal-backdrop-custom open" onClick={() => setSelectedPaciente(null)}>
          <div className="modal-box" role="dialog" aria-modal="true" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Ficha do Paciente</h2>
              <button className="action-btn" type="button" onClick={() => setSelectedPaciente(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-3">
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: selectedPaciente.avatarColor || '#2c5f6e',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 700
                  }}
                >
                  {selectedPaciente.nome.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>{selectedPaciente.nome}</h3>
                  <span className="text-muted small">CPF: {selectedPaciente.cpf} • {selectedPaciente.dataNasc}</span>
                  <div className="mt-1">
                    <span className="badge badge-success me-1">{selectedPaciente.status}</span>
                    <span className="badge badge-info">{selectedPaciente.convenio}</span>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="text-muted small fw-bold">E-MAIL</label>
                  <p className="mb-0 fw-semibold">{selectedPaciente.email}</p>
                </div>
                <div className="col-6">
                  <label className="text-muted small fw-bold">TELEFONE / WHATSAPP</label>
                  <p className="mb-0 fw-semibold">{selectedPaciente.telefone}</p>
                </div>
                <div className="col-6">
                  <label className="text-muted small fw-bold">TOTAL DE SESSÕES</label>
                  <p className="mb-0 fw-semibold">{selectedPaciente.totalSessoes} sessões</p>
                </div>
                <div className="col-6">
                  <label className="text-muted small fw-bold">ÚLTIMA SESSÃO</label>
                  <p className="mb-0 fw-semibold">{selectedPaciente.ultimaSessao}</p>
                </div>
              </div>

              <div className="mb-3">
                <label className="text-muted small fw-bold">QUEIXA PRINCIPAL / MOTIVO DA CONSULTA</label>
                <p className="p-2 bg-light rounded border mb-0 small text-secondary">
                  {selectedPaciente.motivoConsulta || 'Sem queixas registradas no momento.'}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <Link to={`/pacientes/${selectedPaciente.id}/editar`} className="btn-ghost" onClick={() => setSelectedPaciente(null)}>
                <i className="bi bi-pencil me-1"></i> Editar Dados
              </Link>
              <Link to="/sessoes" className="btn-accent" onClick={() => setSelectedPaciente(null)}>
                <i className="bi bi-journal-medical me-1"></i> Ver Prontuário
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
