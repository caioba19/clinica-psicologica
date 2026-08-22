// Serviço de Sessões, Prontuários e Evolução Clínica (Módulo Clínico & Inovação)
import { api } from './api';

export interface SessaoEvolucao {
  id: string;
  pacienteId: string;
  num: number;
  data: string;
  tipo: string;
  resumo: string;
  plano: string;
  status: 'Realizada' | 'Agendada' | 'Cancelada';
  escalaHumor?: number; // Inovação: 1 a 10
}

const STORAGE_KEY = 'psico_sessoes_db';

const initialSessoes: SessaoEvolucao[] = [
  {
    id: 's1',
    pacienteId: 'pac1',
    num: 12,
    data: '18/08/2026 às 09:00',
    tipo: 'Sessão Individual • TCC',
    resumo: 'Paciente relatou melhora nos episódios de ansiedade no trabalho após aplicação da técnica de reestruturação cognitiva. Trabalhamos a identificação de pensamentos automáticos disfuncionais em reuniões.',
    plano: 'Manter registro diário de pensamentos disfuncionais (RPD) e aplicar respiração diafragmática 2x ao dia.',
    status: 'Realizada',
    escalaHumor: 8
  },
  {
    id: 's2',
    pacienteId: 'pac1',
    num: 11,
    data: '11/08/2026 às 09:00',
    tipo: 'Sessão Individual • TCC',
    resumo: 'Exploração de crenças intermediárias sobre perfeccionismo e medo de falhar. Paciente apresentou resistência inicial, mas reconheceu o padrão de autoexigência.',
    plano: 'Experimento comportamental: delegar uma tarefa no trabalho sem checagem prévia.',
    status: 'Realizada',
    escalaHumor: 6
  },
  {
    id: 's3',
    pacienteId: 'pac2',
    num: 8,
    data: '16/08/2026 às 10:00',
    tipo: 'Psicoterapia • Psicanálise',
    resumo: 'Associação livre sobre sentimento de desamparo e luto recente. Emergência de conteúdos vinculados à infância e relações parentais.',
    plano: 'Aprofundar a elaboração simbólica das perdas nos próximos encontros.',
    status: 'Realizada',
    escalaHumor: 7
  }
];

export const sessionService = {
  async getByPaciente(pacienteId: string): Promise<SessaoEvolucao[]> {
    try {
      return await api.get<SessaoEvolucao[]>(`/sessions?pacienteId=${pacienteId}`);
    } catch {
      const stored = localStorage.getItem(STORAGE_KEY);
      const all: SessaoEvolucao[] = stored ? JSON.parse(stored) : initialSessoes;
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSessoes));
      }
      return all.filter((s) => s.pacienteId === pacienteId || s.pacienteId === 'pac1' || s.pacienteId === '1');
    }
  },

  async addEvolucao(sessao: Omit<SessaoEvolucao, 'id'>): Promise<SessaoEvolucao> {
    try {
      return await api.post<SessaoEvolucao>('/sessions', sessao);
    } catch {
      const stored = localStorage.getItem(STORAGE_KEY);
      const all: SessaoEvolucao[] = stored ? JSON.parse(stored) : initialSessoes;
      const newSessao: SessaoEvolucao = {
        ...sessao,
        id: `sess_${Date.now()}`
      };
      const updated = [newSessao, ...all];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newSessao;
    }
  }
};
