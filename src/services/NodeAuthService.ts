import { UserRepository } from '../repositories/UserRepository';
import { UsuarioSistema } from '../types';

export class NodeAuthService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string): Promise<{ user: UsuarioSistema; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (user.situacao !== 'Ativo') {
      throw new Error('Usuário inativo ou bloqueado no sistema.');
    }

    const token = `fake-jwt-token-${user.id}-${Date.now()}`;

    return { user, token };
  }

  async getAllUsers(): Promise<UsuarioSistema[]> {
    return await this.userRepository.findAll();
  }
}