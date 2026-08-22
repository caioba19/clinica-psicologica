// Serviço de Gestão de Usuários e Perfis (Painel do Administrador)
import { api } from './api';
import { UsuarioSistema, SituacaoConta, PerfilUsuario } from '../types';

const STORAGE_KEY = 'psico_usuarios_db';

const initialMockUsuarios: UsuarioSistema[] = [
  {
    id: 'u1',
    nome: 'Renata Farias',
    email: 'renata@clinica.com',
    perfil: 'administrador',
    situacao: 'ativo',
    criadoEm: '10/01/2026'
  },
  {
    id: 'u2',
    nome: 'Dra. Sofia Mendes',
    email: 'dra.sofia@psicomanager.com.br',
    perfil: 'psicologo',
    situacao: 'ativo',
    criadoEm: '15/01/2026'
  },
  {
    id: 'u3',
    nome: 'Dr. Roberto Alves',
    email: 'roberto.alves@clinica.com',
    perfil: 'psicologo',
    situacao: 'ativo',
    criadoEm: '01/02/2026'
  },
  {
    id: 'u4',
    nome: 'Juliana Costa',
    email: 'juliana.atendimento@clinica.com',
    perfil: 'paciente',
    situacao: 'inativo',
    criadoEm: '20/02/2026'
  },
  {
    id: 'u5',
    nome: 'Marcos Vinicius',
    email: 'marcos.v@clinica.com',
    perfil: 'psicologo',
    situacao: 'bloqueado',
    criadoEm: '05/03/2026'
  }
];

export const userService = {
  async getAll(): Promise<UsuarioSistema[]> {
    try {
      return await api.get<UsuarioSistema[]>('/users');
    } catch {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockUsuarios));
      return initialMockUsuarios;
    }
  },

  async create(user: { nome: string; email: string; perfil: PerfilUsuario }): Promise<UsuarioSistema> {
    try {
      return await api.post<UsuarioSistema>('/users', user);
    } catch {
      const all = await this.getAll();
      const newUser: UsuarioSistema = {
        id: `u_${Date.now()}`,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        situacao: 'ativo',
        criadoEm: new Date().toLocaleDateString('pt-BR')
      };

      const updated = [newUser, ...all];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newUser;
    }
  },

  async updateSituacao(id: string, situacao: SituacaoConta): Promise<UsuarioSistema> {
    try {
      return await api.patch<UsuarioSistema>(`/users/${id}`, { situacao });
    } catch {
      const all = await this.getAll();
      const index = all.findIndex((u) => u.id === id);
      if (index === -1) throw new Error('Usuário não encontrado');

      all[index].situacao = situacao;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return all[index];
    }
  },

  async updatePerfil(id: string, perfil: PerfilUsuario): Promise<UsuarioSistema> {
    try {
      return await api.patch<UsuarioSistema>(`/users/${id}`, { perfil });
    } catch {
      const all = await this.getAll();
      const index = all.findIndex((u) => u.id === id);
      if (index === -1) throw new Error('Usuário não encontrado');

      all[index].perfil = perfil;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return all[index];
    }
  }
};
