export type PerfilUsuario = 'administrador' | 'psicologo' | 'paciente';
export type SituacaoConta = 'ativo' | 'inativo' | 'bloqueado';

export interface UsuarioSistema {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  situacao: SituacaoConta;
  criadoEm: string;
}

export interface PsicologoProfissional {
  id: string;
  usuarioId: string;
  nome: string;
  email: string;
  areaAtuacao: string;
  registroCrp: string;
  situacao: SituacaoConta;
}

export interface LogAuditoria {
  id: string;
  autor: string;
  acao: string;
  dataHora: string;
}

export interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNasc: string;
  genero: string;
  status: 'Ativo' | 'Inativo' | 'Em Espera';
  convenio: string;
  psicologoId?: string;
  psicologoNome?: string;
  totalSessoes: number;
  ultimaSessao: string;
  proximaSessao?: string;
  avatarColor?: string;
  motivoConsulta?: string;
  historico?: string;
}

export interface Sessao {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  data: string;
  hora: string;
  duracao: string;
  tipo: 'Individual' | 'Casal' | 'Infantil' | 'Online';
  status: 'Realizada' | 'Agendada' | 'Cancelada' | 'Faltou';
  valor: number;
  pago: boolean;
  resumoEvolucao?: string;
}

export interface LancamentoFinanceiro {
  id: string;
  descricao: string;
  pacienteNome?: string;
  categoria: string;
  data: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  status: 'Pago' | 'Pendente' | 'Atrasado';
  metodo: 'PIX' | 'Cartão' | 'Dinheiro' | 'Transferência';
}

export interface Agendamento {
  id: string;
  pacienteNome: string;
  data: string;
  hora: string;
  tipo: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  sala?: string;
}
