import { UsuarioSistema } from '../types';

export class UserRepository {
  private users: UsuarioSistema[] = [
    {
      id: 'u1',
      nome: 'Renata Farias',
      email: 'admin@clinica.com',
      perfil: 'administrador',
      situacao: 'Ativo',
      criadoEm: '15/01/2026'
    },
    {
      id: 'u2',
      nome: 'Dra. Sofia Mendes',
      email: 'dra.sofia@psicomanager.com.br',
      perfil: 'psicologo',
      situacao: 'Ativo',
      criadoEm: '01/02/2026'
    },
    {
      id: 'u3',
      nome: 'Lucas Ferreira Mendes',
      email: 'lucas.mendes@email.com',
      perfil: 'paciente',
      situacao: 'Ativo',
      criadoEm: '10/03/2026'
    }
  ];

  async findByEmail(email: string): Promise<UsuarioSistema | undefined> {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  async findAll(): Promise<UsuarioSistema[]> {
    return this.users;
  }

  async create(data: Partial<UsuarioSistema>): Promise<UsuarioSistema> {
    const newUser: UsuarioSistema = {
      id: `u${Date.now()}`,
      nome: data.nome || '',
      email: data.email || '',
      perfil: data.perfil || 'psicologo',
      situacao: 'Ativo',
      criadoEm: new Date().toLocaleDateString('pt-BR')
    };
    this.users.unshift(newUser);
    return newUser;
  }

  async updateSituacao(id: string, novaSituacao: 'Ativo' | 'Inativo' | 'Bloqueado'): Promise<UsuarioSistema | null> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    user.situacao = novaSituacao;
    return user;
  }
}