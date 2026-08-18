import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const PacientePortalPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [sessoes] = useState([
    {
      id: '1',
      data: '24/08/2026',
      hora: '09:00',
      psicologo: 'Dra. Sofia Mendes',
      tipo: 'Terapia Cognitivo-Comportamental',
      modalidade: 'Online (Google Meet)',
      status: 'Confirmado',
      linkMeet: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      data: '17/08/2026',
      hora: '09:00',
      psicologo: 'Dra. Sofia Mendes',
      tipo: 'TCC • Sessão #12',
      modalidade: 'Presencial (Sala 01)',
      status: 'Realizada'
    },
    {
      id: '3',
      data: '10/08/2026',
      hora: '09:00',
      psicologo: 'Dra. Sofia Mendes',
      tipo: 'TCC • Sessão #11',
      modalidade: 'Presencial (Sala 01)',
      status: 'Realizada'
    }
  ]);

  const [tarefas] = useState([
    { id: 1, text: 'Preencher registro diário de pensamentos (RPD)', concluida: false },
    { id: 2, text: 'Prática de respiração diafragmática de 5 min', concluida: true },
    { id: 3, text: 'Leitura do material complementar sobre ansiedade', concluida: false }
  ]);

  return (
    <div>
      {/* Banner de Boas-Vindas do Paciente */}
      <div
        style={{
          background: 'linear-gradient(135deg, #173f4b 0%, #2c5f6e 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          color: '#fff',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <span className="badge badge-success mb-2">
            <i className="bi bi-shield-check me-1"></i> Área do Paciente • Espaço Seguro
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
            Olá, {user.name}
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.75)', margin: '6px 0 0' }}>
            Seu acompanhamento psicológico é conduzido por <strong>Dra. Sofia Mendes (CRP 06/123456)</strong>.
          </p>
        </div>

        <div className="text-end d-none d-md-block">
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Próxima Consulta</span>
          <strong style={{ fontSize: '16px', color: '#5cb8a8' }}>Segunda, 24 de Agosto às 09:00</strong>
        </div>
      </div>

      {/* Cards de Resumo para o Paciente */}
      <div className="grid-4 mb-24">
        <StatCard
          title="Próxima Sessão"
          value="24/08"
          change="09:00 (Online)"
          changeType="up"
          icon="calendar-event"
          color="teal"
        />
        <StatCard
          title="Sessões Concluídas"
          value="12"
          change="Evolução contínua"
          changeType="up"
          icon="check-circle"
          color="green"
        />
        <StatCard
          title="Exercícios Terapêuticos"
          value="2 pendentes"
          change="Atividades da semana"
          changeType="down"
          icon="journal-check"
          color="orange"
        />
        <StatCard
          title="Recibos & Faturas"
          value="Em dia"
          change="Sem pendências"
          changeType="up"
          icon="receipt"
          color="blue"
        />
      </div>

      {/* Grid: Minhas Consultas & Atividades Entre Sessões */}
      <div className="grid-2 mb-24">
        {/* Próximos Atendimentos */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Minhas Consultas</h3>
            <button
              className="btn-accent"
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => showToast('Solicitação de reagendamento enviada à psicóloga!', 'info')}
            >
              <i className="bi bi-calendar-plus me-1"></i> Solicitar Reagendamento
            </button>
          </div>
          <div className="card-body">
            {sessoes.map((s) => (
              <div key={s.id} className="p-3 border rounded-3 mb-3 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>{s.data} às {s.hora}</strong>
                  <span className={`badge ${s.status === 'Confirmado' ? 'badge-success' : 'badge-primary'}`}>
                    {s.status}
                  </span>
                </div>
                <p className="mb-1 text-secondary small">
                  <strong>Psicóloga:</strong> {s.psicologo} • {s.tipo}
                </p>
                <p className="mb-2 text-muted small">
                  <strong>Modalidade:</strong> {s.modalidade}
                </p>

                {s.linkMeet && (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mt-1 w-100"
                    onClick={() => showToast('Abrindo sala de teleconsulta criptografada Google Meet...', 'success')}
                  >
                    <i className="bi bi-camera-video me-1"></i> Entrar na Sala Virtual
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exercícios e Tarefas Terapêuticas */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Atividades & Tarefas da Semana</h3>
          </div>
          <div className="card-body">
            {tarefas.map((t) => (
              <div key={t.id} className="d-flex align-items-center gap-3 p-3 border-bottom">
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    border: '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: t.concluida ? 'var(--accent)' : '#fff',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  {t.concluida && <i className="bi bi-check"></i>}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '13.5px', textDecoration: t.concluida ? 'line-through' : 'none', color: t.concluida ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {t.text}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ fontSize: '11px' }}
                  onClick={() => showToast('Registro salvo!', 'success')}
                >
                  {t.concluida ? 'Concluído' : 'Responder'}
                </button>
              </div>
            ))}

            <div className="mt-4 p-3 bg-light rounded-3 border">
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className="bi bi-shield-check text-success"></i>
                <strong style={{ fontSize: '13px' }}>Sigilo Profissional Garantido</strong>
              </div>
              <p className="text-muted small mb-0">
                Suas anotações são de acesso restrito e protegidas pelo Código de Ética Profissional do Psicólogo (CFP).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
