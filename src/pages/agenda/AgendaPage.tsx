import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

interface EventoAgenda {
  id: string;
  hora: string;
  duracao: string;
  paciente: string;
  tipo: string;
  sala: string;
  avatar: string;
  color: 'teal' | 'blue' | 'green' | 'orange' | 'red';
}

export const AgendaPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState(17);
  const [activeTab, setActiveTab] = useState<'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'>('Seg');
  const [modalOpen, setModalOpen] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const [eventos, setEventos] = useState<EventoAgenda[]>([
    { id: '1', hora: '09:00', duracao: '50 min', paciente: 'Lucas Ferreira Mendes', tipo: 'TCC • Presencial', sala: 'Sala 01', avatar: 'LF', color: 'teal' },
    { id: '2', hora: '10:30', duracao: '50 min', paciente: 'Beatriz Santos Oliveira', tipo: 'Psicanálise • Presencial', sala: 'Sala 01', avatar: 'BS', color: 'blue' },
    { id: '3', hora: '14:00', duracao: '50 min', paciente: 'Ana Paula Rodrigues', tipo: 'TCC • Online', sala: 'Google Meet', avatar: 'AP', color: 'green' },
    { id: '4', hora: '16:00', duracao: '50 min', paciente: 'Carlos Eduardo Ramos', tipo: 'Humanista • Presencial', sala: 'Sala 02', avatar: 'CE', color: 'orange' },
    { id: '5', hora: '17:30', duracao: '50 min', paciente: 'Mariana Costa Lima', tipo: 'Avaliação • Presencial', sala: 'Sala 01', avatar: 'MC', color: 'red' }
  ]);

  const [novoPaciente, setNovoPaciente] = useState('');
  const [novaHora, setNovaHora] = useState('');
  const [novoTipo, setNovoTipo] = useState('TCC • Presencial');
  const [novaSala, setNovaSala] = useState('Sala 01');

  const horasGrade = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  const handleCreateEvento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoPaciente || !novaHora) {
      showToast('Preencha os campos obrigatórios.', 'warning');
      return;
    }

    const initials = novoPaciente.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
    const novo: EventoAgenda = {
      id: Math.random().toString(),
      hora: novaHora,
      duracao: '50 min',
      paciente: novoPaciente,
      tipo: novoTipo,
      sala: novaSala,
      avatar: initials || 'PX',
      color: 'teal'
    };

    setEventos((prev) => [...prev, novo]);
    showToast(`Agendamento de ${novoPaciente} adicionado!`, 'success');
    setModalOpen(false);
    setNovoPaciente('');
    setNovaHora('');
  };

  const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Agenda Clínica</h1>
          <p className="page-subtitle">Gerencie suas sessões, horários disponíveis e atendimentos</p>
        </div>
        <button className="btn-accent" onClick={() => setModalOpen(true)}>
          <i className="bi bi-calendar-plus me-1"></i> Nova Consulta
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '20px', alignItems: 'start' }}>
        {/* Grade Horária */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div className="d-flex gap-1 p-1 rounded-3 border" style={{ background: 'var(--bg-card)' }}>
              {(['Seg', 'Ter', 'Qua', 'Qui', 'Sex'] as const).map((dia) => (
                <button
                  key={dia}
                  type="button"
                  className={`btn btn-sm ${activeTab === dia ? 'btn-primary' : 'btn-ghost'} border-0`}
                  style={{ fontWeight: 600, fontSize: '12.5px' }}
                  onClick={() => setActiveTab(dia)}
                >
                  {dia} (Agosto)
                </button>
              ))}
            </div>

            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                style={{ width: '160px' }}
              >
                <option value="todos">Todos os Tipos</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div className="card">
            <div className="card-body p-0">
              <div style={{ maxHeight: 'calc(100vh - 270px)', overflowY: 'auto' }}>
                {horasGrade.map((h) => {
                  const evs = eventos.filter((e) => e.hora.startsWith(h.substring(0, 2)));
                  return (
                    <div
                      key={h}
                      style={{
                        display: 'flex',
                        minHeight: '70px',
                        borderBottom: '1px solid var(--border)'
                      }}
                    >
                      <div
                        style={{
                          width: '70px',
                          padding: '12px 14px 0 0',
                          textAlign: 'right',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        {h}
                      </div>
                      <div style={{ flex: 1, padding: '8px 12px', background: evs.length ? 'rgba(92,184,168,0.03)' : '#fff' }}>
                        {evs.map((ev) => (
                          <div
                            key={ev.id}
                            style={{
                              background: 'rgba(92,184,168,0.12)',
                              borderLeft: '4px solid var(--accent)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              marginBottom: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '12px',
                              cursor: 'pointer'
                            }}
                            onClick={() => showToast(`Paciente: ${ev.paciente} (${ev.sala})`, 'info')}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '50%',
                                  background: 'var(--primary)',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: 700
                                }}
                              >
                                {ev.avatar}
                              </div>
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{ev.paciente}</strong>
                                <span className="d-block text-muted" style={{ fontSize: '11.5px' }}>{ev.tipo} • {ev.sala}</span>
                              </div>
                            </div>
                            <span className="badge badge-primary">{ev.hora} ({ev.duracao})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Direita da Agenda (Mini Calendário + Lista) */}
        <div>
          <div className="card mb-3">
            <div className="card-header bg-dark text-white p-3" style={{ background: 'var(--bg-sidebar)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <strong style={{ fontSize: '14px' }}>Agosto 2026</strong>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-outline-light p-1" style={{ lineHeight: 1 }}><i className="bi bi-chevron-left"></i></button>
                  <button className="btn btn-sm btn-outline-light p-1" style={{ lineHeight: 1 }}><i className="bi bi-chevron-right"></i></button>
                </div>
              </div>
            </div>
            <div className="card-body p-3">
              <div className="d-grid text-center mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              <div className="d-grid text-center gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)', fontSize: '12px' }}>
                {diasMes.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className="border-0 rounded-2 p-2"
                    style={{
                      background: d === selectedDay ? 'var(--primary)' : 'transparent',
                      color: d === selectedDay ? '#fff' : 'inherit',
                      fontWeight: d === selectedDay ? 700 : 400,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelectedDay(d);
                      showToast(`Visualizando dia ${d} de Agosto`, 'info');
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title" style={{ fontSize: '14px' }}>Próximos Hoje</h3>
            </div>
            <div className="card-body p-3">
              {eventos.slice(0, 4).map((ev) => (
                <div key={ev.id} className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                  <div className="text-center" style={{ minWidth: '42px' }}>
                    <strong className="d-block" style={{ fontSize: '13px', color: 'var(--primary)' }}>{ev.hora}</strong>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="mb-0 text-truncate" style={{ fontSize: '13px', fontWeight: 600 }}>{ev.paciente}</p>
                    <span className="text-muted" style={{ fontSize: '11px' }}>{ev.tipo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nova Consulta */}
      {modalOpen && (
        <div className="modal-backdrop-custom open" onClick={() => setModalOpen(false)}>
          <div className="modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nova Consulta na Agenda</h2>
              <button className="action-btn" type="button" onClick={() => setModalOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleCreateEvento}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome do Paciente *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Lucas Ferreira"
                    value={novoPaciente}
                    onChange={(e) => setNovoPaciente(e.target.value)}
                    required
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Horário *</label>
                    <input
                      type="time"
                      className="form-control"
                      value={novaHora}
                      onChange={(e) => setNovaHora(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Sala</label>
                    <select className="form-select" value={novaSala} onChange={(e) => setNovaSala(e.target.value)}>
                      <option value="Sala 01">Sala 01</option>
                      <option value="Sala 02">Sala 02</option>
                      <option value="Google Meet">Online (Google Meet)</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo de Atendimento</label>
                  <select className="form-select" value={novoTipo} onChange={(e) => setNovoTipo(e.target.value)}>
                    <option value="TCC • Presencial">TCC • Presencial</option>
                    <option value="Psicanálise • Presencial">Psicanálise • Presencial</option>
                    <option value="TCC • Online">TCC • Online</option>
                    <option value="Avaliação Psicológica">Avaliação Psicológica</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-accent">
                  <i className="bi bi-check-lg me-1"></i> Agendar Sessão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
