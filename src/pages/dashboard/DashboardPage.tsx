import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalizar laudo psicológico de Lucas Ferreira', done: false, tag: 'Urgente', tagClass: 'urgente' },
    { id: 2, text: 'Enviar link da sessão online para Ana Paula', done: true, tag: 'Normal', tagClass: 'normal' },
    { id: 3, text: 'Confirmar horário da consulta de Beatriz Santos', done: false, tag: 'Hoje', tagClass: 'ok' },
    { id: 4, text: 'Emitir recibo de pagamento - Mariana Costa', done: false, tag: 'Financeiro', tagClass: 'normal' }
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    showToast('Status da tarefa atualizado!', 'info');
  };

  const consultasHoje = [
    { hora: '09:00', periodo: 'Manhã', nome: 'Lucas Ferreira Mendes', tipo: 'TCC • Presencial (Sala 01)', avatar: 'LF', bg: '#2c5f6e' },
    { hora: '10:30', periodo: 'Manhã', nome: 'Beatriz Santos Oliveira', tipo: 'Psicanálise • Presencial (Sala 01)', avatar: 'BS', bg: '#5cb8a8' },
    { hora: '14:00', periodo: 'Tarde', nome: 'Ana Paula Rodrigues', tipo: 'TCC • Online (Google Meet)', avatar: 'AP', bg: '#3daa72' },
    { hora: '16:00', periodo: 'Tarde', nome: 'Carlos Eduardo Ramos', tipo: 'Humanista • Presencial (Sala 02)', avatar: 'CE', bg: '#f0a500' },
    { hora: '17:30', periodo: 'Tarde', nome: 'Mariana Costa Lima', tipo: 'Avaliação • Presencial (Sala 01)', avatar: 'MC', bg: '#e05c5c' }
  ];

  return (
    <div>
      {/* Banner de Boas-Vindas */}
      <div className="welcome-banner" style={{
        background: 'linear-gradient(135deg, var(--bg-sidebar) 0%, var(--primary) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff'
      }}>
        <div className="welcome-text">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge" style={{ background: 'rgba(92, 184, 168, 0.2)', color: '#b8e3dc', fontSize: '11px', fontWeight: 600, border: '1px solid rgba(92,184,168,0.3)' }}>
              <i className="bi bi-activity me-1"></i> Painel de Atendimento
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
            Olá, {user.name}
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            Você possui <strong>5 atendimentos</strong> agendados para hoje. Tenha uma excelente jornada clínica!
          </p>
        </div>
        <div className="welcome-date text-end d-none d-md-block">
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Hoje é</p>
          <strong style={{ fontSize: '15px', color: '#fff' }}>Segunda-feira, 17 de Agosto</strong>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid-4 mb-24">
        <StatCard
          title="Atendimentos Hoje"
          value="5"
          change="100% confirmados"
          changeType="up"
          icon="calendar-check"
          color="teal"
        />
        <StatCard
          title="Pacientes Ativos"
          value="28"
          change="+3 este mês"
          changeType="up"
          icon="people"
          color="blue"
        />
        <StatCard
          title="Faturamento Mensal"
          value="R$ 14.800"
          change="+12.5% vs anterior"
          changeType="up"
          icon="currency-dollar"
          color="green"
        />
        <StatCard
          title="Prontuários Pendentes"
          value="2"
          change="Requer evolução"
          changeType="down"
          icon="journal-text"
          color="orange"
        />
      </div>

      {/* Seção Principal: Agenda do Dia e Tarefas */}
      <div className="grid-2 mb-24">
        {/* Próximas Consultas Hoje */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Agenda de Hoje</h3>
            <Link to="/agenda" className="btn-ghost" style={{ padding: '6px 12px', fontSize: '12px' }}>
              Ver Agenda Completa <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="card-body">
            {consultasHoje.map((c, i) => (
              <div key={i} className="consulta-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '13px 0',
                borderBottom: i < consultasHoje.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div className="consulta-hora" style={{ width: '52px', textAlign: 'center', flexShrink: 0 }}>
                  <div className="hora" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{c.hora}</div>
                  <div className="periodo" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{c.periodo}</div>
                </div>
                <div className="consulta-bar" style={{ width: '3px', height: '38px', borderRadius: '2px', background: 'linear-gradient(to bottom, var(--accent), var(--primary-light))' }}></div>
                <div className="consulta-info" style={{ flex: 1 }}>
                  <div className="consulta-nome" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.nome}</div>
                  <div className="consulta-tipo" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{c.tipo}</div>
                </div>
                <div
                  className="consulta-avatar"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    background: c.bg
                  }}
                >
                  {c.avatar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarefas e Pendências */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tarefas & Lembretes</h3>
            <button
              className="btn-accent"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => showToast('Digite sua nova anotação', 'info')}
            >
              <i className="bi bi-plus-lg me-1"></i> Nova Tarefa
            </button>
          </div>
          <div className="card-body">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
                onClick={() => toggleTask(task.id)}
              >
                <div
                  className={`task-checkbox ${task.done ? 'checked' : ''}`}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: task.done ? 'var(--accent)' : '#fff',
                    borderColor: task.done ? 'var(--accent)' : 'var(--border)',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                >
                  {task.done && <i className="bi bi-check-lg"></i>}
                </div>
                <span
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    color: task.done ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: task.done ? 'line-through' : 'none'
                  }}
                >
                  {task.text}
                </span>
                <span className={`task-tag ${task.tagClass}`}>
                  {task.tag}
                </span>
              </div>
            ))}

            <div className="mt-4 p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
              <div>
                <strong className="d-block" style={{ fontSize: '13px' }}>Precisa de ajuda com prontuários?</strong>
                <span className="text-muted" style={{ fontSize: '12px' }}>Acesse os modelos prontos do CFP</span>
              </div>
              <Link to="/sessoes" className="btn-ghost" style={{ padding: '4px 10px', fontSize: '11.5px' }}>
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
