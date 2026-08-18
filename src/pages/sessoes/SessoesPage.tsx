import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

interface SessaoItem {
  id: string;
  num: number;
  data: string;
  tipo: string;
  resumo: string;
  plano: string;
  status: 'Realizada' | 'Agendada';
}

export const SessoesPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPacId, setSelectedPacId] = useState('1');
  const [activeTab, setActiveTab] = useState<'evolucoes' | 'anamnese' | 'documentos'>('evolucoes');
  const [openSessaoId, setOpenSessaoId] = useState<string | null>('s1');
  const [novaNota, setNovaNota] = useState('');
  const [planoAcao, setPlanoAcao] = useState('');

  const pacientesLista = [
    { id: '1', nome: 'Lucas Ferreira Mendes', idade: '34 anos', modalidade: 'TCC', sessoes: 12, crp: '06/123456', avatar: 'LF', color: '#2c5f6e' },
    { id: '2', nome: 'Beatriz Santos Oliveira', idade: '27 anos', modalidade: 'Psicanálise', sessoes: 8, crp: '06/123456', avatar: 'BS', color: '#5cb8a8' },
    { id: '3', nome: 'Carlos Eduardo Ramos', idade: '40 anos', modalidade: 'Humanista', sessoes: 24, crp: '06/123456', avatar: 'CE', color: '#f0a500' },
    { id: '4', nome: 'Ana Paula Rodrigues', idade: '25 anos', modalidade: 'TCC', sessoes: 4, crp: '06/123456', avatar: 'AP', color: '#3daa72' }
  ];

  const currentPac = pacientesLista.find((p) => p.id === selectedPacId) || pacientesLista[0];

  const [sessoes, setSessoes] = useState<SessaoItem[]>([
    {
      id: 's1',
      num: 12,
      data: '10/08/2026 às 09:00',
      tipo: 'Sessão Individual • TCC',
      resumo: 'Paciente relatou melhora nos episódios de ansiedade no trabalho após aplicação da técnica de reestruturação cognitiva. Trabalhamos a identificação de pensamentos automáticos disfuncionais em reuniões.',
      plano: 'Manter registro diário de pensamentos disfuncionais (RPD) e aplicar respiração diafragmática 2x ao dia.',
      status: 'Realizada'
    },
    {
      id: 's2',
      num: 11,
      data: '03/08/2026 às 09:00',
      tipo: 'Sessão Individual • TCC',
      resumo: 'Exploração de crenças intermediárias sobre perfeccionismo e medo de falhar. Paciente apresentou resistência inicial, mas reconheceu o padrão de autoexigência.',
      plano: 'Experimento comportamental: delegar uma tarefa no trabalho sem checagem prévia.',
      status: 'Realizada'
    },
    {
      id: 's3',
      num: 10,
      data: '27/07/2026 às 09:00',
      tipo: 'Sessão Individual • TCC',
      resumo: 'Revisão das metas terapêuticas estabelecidas no início do processo. Boa adesão às atividades propostas.',
      plano: 'Introdução ao questionamento socrático para distorções cognitivas de catastrofização.',
      status: 'Realizada'
    }
  ]);

  const handleSalvarEvolucao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaNota) {
      showToast('Digite a nota de evolução antes de salvar.', 'warning');
      return;
    }

    const novaSessao: SessaoItem = {
      id: Math.random().toString(),
      num: sessoes.length + 1,
      data: 'Hoje às 10:00',
      tipo: 'Sessão Individual • TCC',
      resumo: novaNota,
      plano: planoAcao || 'Continuidade do plano terapêutico acordado.',
      status: 'Realizada'
    };

    setSessoes([novaSessao, ...sessoes]);
    setNovaNota('');
    setPlanoAcao('');
    showToast('Evolução clínica registrada e criptografada no prontuário!', 'success');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Sessões & Prontuários</h1>
          <p className="page-subtitle">Registro de evolução clínica, anamnese e documentos em conformidade com CFP/LGPD</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        {/* Painel Esquerdo: Lista de Pacientes */}
        <div className="card">
          <div className="card-header p-3">
            <h3 className="card-title" style={{ fontSize: '14px' }}>Selecionar Paciente</h3>
          </div>
          <div className="card-body p-0">
            {pacientesLista.map((pac) => (
              <div
                key={pac.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  background: selectedPacId === pac.id ? 'rgba(92,184,168,0.1)' : 'transparent',
                  borderLeft: selectedPacId === pac.id ? '4px solid var(--accent)' : '4px solid transparent'
                }}
                onClick={() => setSelectedPacId(pac.id)}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: pac.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {pac.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="mb-0 text-truncate" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {pac.nome}
                  </p>
                  <span className="text-muted" style={{ fontSize: '11px' }}>{pac.modalidade} • {pac.sessoes} sessões</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel Direito: Prontuário do Paciente */}
        <div>
          {/* Banner Hero do Paciente */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--bg-sidebar), var(--primary))',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              color: '#fff',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: currentPac.color,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                {currentPac.avatar}
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, margin: 0 }}>
                  {currentPac.nome}
                </h2>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  {currentPac.idade} • Abordagem: {currentPac.modalidade}
                </p>
              </div>
            </div>

            <div className="d-flex gap-4 text-center">
              <div>
                <strong style={{ fontSize: '20px', display: 'block' }}>{sessoes.length}</strong>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Evoluções</span>
              </div>
              <div>
                <strong style={{ fontSize: '20px', display: 'block' }}>100%</strong>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Protegido</span>
              </div>
            </div>
          </div>

          {/* Abas */}
          <div className="d-flex gap-2 border-bottom mb-4">
            <button
              type="button"
              className={`btn ${activeTab === 'evolucoes' ? 'btn-primary' : 'btn-ghost'} border-bottom-0 rounded-bottom-0`}
              onClick={() => setActiveTab('evolucoes')}
            >
              <i className="bi bi-journal-text me-1"></i> Evoluções Clínicas
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'anamnese' ? 'btn-primary' : 'btn-ghost'} border-bottom-0 rounded-bottom-0`}
              onClick={() => setActiveTab('anamnese')}
            >
              <i className="bi bi-file-earmark-person me-1"></i> Anamnese & Queixa
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'documentos' ? 'btn-primary' : 'btn-ghost'} border-bottom-0 rounded-bottom-0`}
              onClick={() => setActiveTab('documentos')}
            >
              <i className="bi bi-paperclip me-1"></i> Laudos & Documentos
            </button>
          </div>

          {/* Aba Evoluções */}
          {activeTab === 'evolucoes' && (
            <div>
              {/* Novo Registro de Evolução */}
              <div className="card mb-4">
                <div className="card-header">
                  <h3 className="card-title" style={{ fontSize: '15px' }}>
                    <i className="bi bi-pencil-square me-2 text-primary"></i>Registrar Nova Evolução Clínica
                  </h3>
                </div>
                <form onSubmit={handleSalvarEvolucao}>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Relato da Sessão & Evolução Psicológica *</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Descreva as técnicas aplicadas, estado emocional do paciente, intervenções e observações clínicas relevantes..."
                        value={novaNota}
                        onChange={(e) => setNovaNota(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Plano de Ação / Tarefas Entre Sessões</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: Registro diário de pensamentos, técnicas de relaxamento..."
                        value={planoAcao}
                        onChange={(e) => setPlanoAcao(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">
                        <i className="bi bi-shield-lock me-1"></i>Registro assinado digitalmente por Dra. Sofia Mendes (CRP 06/123456)
                      </span>
                      <button type="submit" className="btn-accent">
                        <i className="bi bi-check-circle me-1"></i> Salvar no Prontuário
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Histórico de Sessões Anteriores */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Histórico de Sessões ({sessoes.length})</h3>
                </div>
                <div className="card-body p-3">
                  {sessoes.map((s) => {
                    const isOpen = openSessaoId === s.id;
                    return (
                      <div key={s.id} className="border rounded-3 mb-3 overflow-hidden">
                        <div
                          className="p-3 bg-light d-flex align-items-center justify-content-between cursor-pointer"
                          onClick={() => setOpenSessaoId(isOpen ? null : s.id)}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span className="badge badge-primary">Sessão #{s.num}</span>
                            <strong>{s.data}</strong>
                            <span className="text-muted small">{s.tipo}</span>
                          </div>
                          <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} text-muted`}></i>
                        </div>
                        {isOpen && (
                          <div className="p-3 bg-white border-top">
                            <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '12px' }}>
                              {s.resumo}
                            </p>
                            {s.plano && (
                              <div className="p-2 bg-light rounded border small">
                                <strong>Plano / Tarefa:</strong> {s.plano}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Aba Anamnese */}
          {activeTab === 'anamnese' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Anamnese Completa</h3>
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="text-muted small fw-bold">QUEIXA PRINCIPAL</label>
                    <p className="p-2 bg-light rounded border mb-0">
                      Paciente buscou atendimento devido a crises de ansiedade associadas à sobrecarga de trabalho.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small fw-bold">HISTÓRICO FAMILIAR</label>
                    <p className="p-2 bg-light rounded border mb-0">
                      Mãe com histórico de transtorno depressivo. Pai sem histórico psiquiátrico relatado.
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-bold">HISTÓRICO PESSOAL E SOCIAL</label>
                  <p className="p-2 bg-light rounded border mb-0">
                    Graduado em Ciência da Computação, atua em modelo remoto. Relata isolamento social moderado nos últimos 6 meses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Aba Documentos */}
          {activeTab === 'documentos' && (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Documentos & Declarações</h3>
                <button className="btn-accent btn-sm" onClick={() => showToast('Novo laudo gerado', 'success')}>
                  <i className="bi bi-file-earmark-plus me-1"></i> Gerar Declaração / Atestado
                </button>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between p-3 border rounded mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-file-earmark-pdf fs-3 text-danger"></i>
                    <div>
                      <strong className="d-block">Declaração de Comparecimento - Sessão #12</strong>
                      <span className="text-muted small">Gerado em 10/08/2026 • PDF assinado</span>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => showToast('Download iniciado', 'info')}>
                    <i className="bi bi-download"></i>
                  </button>
                </div>

                <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-file-earmark-text fs-3 text-primary"></i>
                    <div>
                      <strong className="d-block">Contrato Terapêutico & Termo de Consentimento LGPD</strong>
                      <span className="text-muted small">Assinado digitalmente em 15/05/2026</span>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => showToast('Download iniciado', 'info')}>
                    <i className="bi bi-download"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
