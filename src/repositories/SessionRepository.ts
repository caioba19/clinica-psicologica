import { Sessao } from '../types';

export class SessionRepository {
  private sessions: Sessao[] = [
    {
      id: 'sess_1',
      pacienteId: 'pac1',
      psicologoId: 'u2',
      data: '2026-08-18',
      queixaPrincipal: 'Estresse leve durante prazos de entregas no trabalho.',
      evolucaoText: 'Paciente relata redução nos episódios de ansiedade no ambiente de trabalho após aplicação das técnicas recomendadas.',
      humorScale: 8,
      adesaoScale: 9,
      status: 'Concluída'
    }
  ];

  async findByPatientId(pacienteId: string): Promise<Sessao[]> {
    return this.sessions.filter((s) => s.pacienteId === pacienteId);
  }

  async create(data: Partial<Sessao>): Promise<Sessao> {
    const newSession: Sessao = {
      id: `sess_${Date.now()}`,
      pacienteId: data.pacienteId || '',
      psicologoId: data.psicologoId || 'u2',
      data: data.data || new Date().toISOString().split('T')[0],
      queixaPrincipal: data.queixaPrincipal || '',
      evolucaoText: data.evolucaoText || '',
      humorScale: data.humorScale || 5,
      adesaoScale: data.adesaoScale || 5,
      status: data.status || 'Concluída'
    };

    this.sessions.unshift(newSession);
    return newSession;
  }
}