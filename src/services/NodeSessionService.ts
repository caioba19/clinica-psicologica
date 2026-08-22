import { SessionRepository } from '../repositories/SessionRepository';
import { Sessao } from '../types';

export class NodeSessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async getSessionsByPatient(pacienteId: string): Promise<Sessao[]> {
    return await this.sessionRepository.findByPatientId(pacienteId);
  }

  async createSession(data: Partial<Sessao>): Promise<Sessao> {
    if (!data.pacienteId || !data.evolucaoText) {
      throw new Error('ID do paciente e relato de evolução são obrigatórios.');
    }
    return await this.sessionRepository.create(data);
  }
}