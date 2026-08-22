export type PerfilUsuario = 'administrador' | 'psicologo' | 'paciente';
export type SituacaoConta = 'Ativo' | 'Inativo' | 'Bloqueado';

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
  situacao: 'Ativo' | 'Bloqueado' | 'Inativo';
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
  dataNasc?: string;
  genero?: string;
  status: 'Ativo' | 'Em Espera' | 'Inativo';
  convenio?: string;
  psicologoId?: string;
  psicologoNome?: string;
  totalSessoes?: number;
  ultimaSessao?: string;
  proximaSessao?: string;
  avatarColor?: string;
  motivoConsulta?: string;
  historico?: string;
}

export interface Sessao {
  id: string;
  pacienteId: string;
  psicologoId: string;
  data: string;
  queixaPrincipal?: string;
  evolucaoText: string;
  humorScale: number;      
  adesaoScale: number;     
  status?: string;
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
