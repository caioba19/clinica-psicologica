export type Perfil = "administrador" | "psicologo";
export type Situacao = "ativo" | "inativo" | "bloqueado";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  situacao: Situacao;
  criadoEm: string;
}

export interface Psicologo {
  id: string;
  usuarioId: string;
  nome: string;
  email: string;
  areaAtuacao: string;
  registro: string;
  situacao: Situacao;
}

export interface Paciente {
  id: string;
  nome: string;
  contato: string;
  dataNascimento: string;
  psicologoId: string;
  situacao: Situacao;
  observacoes?: string;
}

export interface Atendimento {
  id: string;
  pacienteId: string;
  data: string;
  horario: string;
  confirmado: boolean;
}

export interface LogAcao {
  id: string;
  autor: string;
  acao: string;
  dataHora: string;
}
