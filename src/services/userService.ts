import { api } from './api';
import { UsuarioSistema } from '../types';

export const adminUserService = {
  async getAll(): Promise<UsuarioSistema[]> {
    return await api.get<UsuarioSistema[]>('/users');
  },

  async create(data: Partial<UsuarioSistema>): Promise<UsuarioSistema> {
    return await api.post<UsuarioSistema>('/users', data);
  },

  async updateSituacao(id: string, situacao: 'Ativo' | 'Inativo' | 'Bloqueado'): Promise<UsuarioSistema> {
    return await api.patch<UsuarioSistema>(`/users/${id}/situacao`, { situacao });
  }
};