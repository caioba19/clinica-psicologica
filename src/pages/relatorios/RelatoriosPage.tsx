import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { useToast } from '../../context/ToastContext';

export const RelatoriosPage: React.FC = () => {
  const { showToast } = useToast();
  const [periodo, setPeriodo] = useState('mes');

  const rankingDiagnosticos = [
    { rank: 1, nome: 'Ansiedade Generalizada (F41.1)', total: 14, percent: 45, isTop: true },
    { rank: 2, nome: 'Episódio Depressivo Leve/Mod (F32)', total: 8, percent: 26, isTop: false },
    { rank: 3, nome: 'Estresse Ocupacional / Burnout (Z73.0)', total: 5, percent: 16, isTop: false },
    { rank: 4, nome: 'Transição de Carreira & Relacionamentos', total: 4, percent: 13, isTop: false }
  ];

  const handleExport = (tipo: string) => {
    showToast(`Gerando relatório em formato ${tipo}... Download iniciado!`, 'success');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Relatórios & Indicadores</h1>
          <p className="page-subtitle">Análises clínicas, volumetria de sessões e exportação de dados</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-ghost" onClick={() => handleExport('Excel/CSV')}>
            <i className="bi bi-file-earmark-spreadsheet me-1"></i> Exportar CSV
          </button>
          <button className="btn-accent" onClick={() => handleExport('PDF')}>
            <i className="bi bi-file-earmark-pdf me-1"></i> Exportar PDF
          </button>
        </div>
      </div>

      {/* Filtro de Período */}
      <div className="card mb-4">
        <div className="card-body p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-secondary small">Período de Análise:</span>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${periodo === 'mes' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setPeriodo('mes')}
              >
                Este Mês
              </button>
              <button
                type="button"
                className={`btn btn-sm ${periodo === 'trimestre' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setPeriodo('trimestre')}
              >
                Último Trimestre
              </button>
              <button
                type="button"
                className={`btn btn-sm ${periodo === 'ano' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setPeriodo('ano')}
              >
                Ano Atual (2026)
              </button>
            </div>
          </div>
          <span className="text-muted small">Última consolidação: 17/08/2026</span>
        </div>
      </div>

      {/* Métricas do Período */}
      <div className="grid-4 mb-24">
        <StatCard
          title="Total de Sessões"
          value="64"
          change="+14.2% vs anterior"
          changeType="up"
          icon="journal-check"
          color="teal"
        />
        <StatCard
          title="Taxa de Frequência"
          value="95.2%"
          change="Apenas 3 faltas"
          changeType="up"
          icon="check2-all"
          color="green"
        />
        <StatCard
          title="Ticket Médio / Sessão"
          value="R$ 210,00"
          change="Estável"
          changeType="up"
          icon="cash-stack"
          color="blue"
        />
        <StatCard
          title="Novos Pacientes"
          value="6"
          change="+2 no mês"
          changeType="up"
          icon="person-plus"
          color="orange"
        />
      </div>

      {/* Diagnósticos e Queixas Mais Frequentes */}
      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Principais Queixas & Diagnósticos Clínicos</h3>
          </div>
          <div className="card-body">
            {rankingDiagnosticos.map((item) => (
              <div key={item.rank} className="d-flex align-items-center gap-3 py-3 border-bottom">
                <span
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: item.isTop ? 'var(--accent)' : 'var(--bg-main)',
                    color: item.isTop ? '#12343c' : 'var(--text-secondary)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
                  #{item.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <strong className="d-block text-dark" style={{ fontSize: '13.5px' }}>{item.nome}</strong>
                  <div className="progress mt-1" style={{ height: '6px' }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${item.percent}%`, background: 'var(--accent)' }}
                    />
                  </div>
                </div>
                <div className="text-end">
                  <strong className="d-block text-dark">{item.total} pac.</strong>
                  <span className="text-muted small">{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo de Modalidade e Canais */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Distribuição por Modalidade de Atendimento</h3>
          </div>
          <div className="card-body">
            <div className="p-3 bg-light rounded-3 mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-bold">Presencial (Clínica Física)</span>
                <strong>68% (44 sessões)</strong>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar" style={{ width: '68%', background: 'var(--primary)' }}></div>
              </div>
            </div>

            <div className="p-3 bg-light rounded-3 mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-bold">Online (Google Meet / Teleconsulta)</span>
                <strong>32% (20 sessões)</strong>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar" style={{ width: '32%', background: 'var(--accent)' }}></div>
              </div>
            </div>

            <div className="mt-4 p-3 border rounded text-secondary small">
              <i className="bi bi-info-circle text-primary me-2"></i>
              Os atendimentos online cumprem integralmente a <strong>Resolução CFP nº 04/2020</strong> e utilizam salas criptografadas ponto-a-ponto.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
