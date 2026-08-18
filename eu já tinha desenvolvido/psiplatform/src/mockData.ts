import type { Usuario, Psicologo, Paciente, Atendimento, LogAcao } from "./types";

export const usuarios: Usuario[] = [
  { id: "u1", nome: "Renata Farias", email: "renata@clinica.com", perfil: "administrador", situacao: "ativo", criadoEm: "2026-01-10" },
  { id: "u2", nome: "Marcelo Andrade", email: "marcelo@clinica.com", perfil: "psicologo", situacao: "ativo", criadoEm: "2026-02-03" },
  { id: "u3", nome: "Juliana Prado", email: "juliana@clinica.com", perfil: "psicologo", situacao: "ativo", criadoEm: "2026-02-14" },
  { id: "u4", nome: "Diego Ramos", email: "diego@clinica.com", perfil: "psicologo", situacao: "inativo", criadoEm: "2026-03-01" },
  { id: "u5", nome: "Bianca Souza", email: "bianca@clinica.com", perfil: "psicologo", situacao: "bloqueado", criadoEm: "2026-03-20" },
];

export const psicologos: Psicologo[] = [
  { id: "p1", usuarioId: "u2", nome: "Marcelo Andrade", email: "marcelo@clinica.com", areaAtuacao: "Clínica", registro: "CRP 03/12345", situacao: "ativo" },
  { id: "p2", usuarioId: "u3", nome: "Juliana Prado", email: "juliana@clinica.com", areaAtuacao: "Organizacional", registro: "CRP 03/54321", situacao: "ativo" },
  { id: "p3", usuarioId: "u4", nome: "Diego Ramos", email: "diego@clinica.com", areaAtuacao: "Escolar", registro: "CRP 03/98765", situacao: "inativo" },
];

export const pacientes: Paciente[] = [
  { id: "pac1", nome: "Carla Menezes", contato: "(71) 99887-1122", dataNascimento: "1990-05-14", psicologoId: "p1", situacao: "ativo" },
  { id: "pac2", nome: "Rodrigo Alves", contato: "(71) 98811-3344", dataNascimento: "1985-11-02", psicologoId: "p1", situacao: "ativo" },
  { id: "pac3", nome: "Fernanda Lima", contato: "(71) 99222-5566", dataNascimento: "2001-07-19", psicologoId: "p2", situacao: "inativo" },
  { id: "pac4", nome: "Thiago Nunes", contato: "(71) 98333-7788", dataNascimento: "1978-02-28", psicologoId: "p2", situacao: "ativo" },
];

export const atendimentos: Atendimento[] = [
  { id: "a1", pacienteId: "pac1", data: "2026-08-19", horario: "09:00", confirmado: true },
  { id: "a2", pacienteId: "pac2", data: "2026-08-19", horario: "11:00", confirmado: false },
  { id: "a3", pacienteId: "pac4", data: "2026-08-20", horario: "14:30", confirmado: true },
];

export const logs: LogAcao[] = [
  { id: "l1", autor: "Renata Farias", acao: "Bloqueou o acesso de Bianca Souza", dataHora: "2026-08-15 10:22" },
  { id: "l2", autor: "Renata Farias", acao: "Cadastrou o psicólogo Diego Ramos", dataHora: "2026-08-10 16:05" },
  { id: "l3", autor: "Marcelo Andrade", acao: "Atualizou o cadastro de Carla Menezes", dataHora: "2026-08-09 08:41" },
];

// Credenciais fictícias para demonstração do front (login mockado)
export const credenciais: Record<string, { senha: string; usuarioId: string }> = {
  "renata@clinica.com": { senha: "admin123", usuarioId: "u1" },
  "marcelo@clinica.com": { senha: "psi123", usuarioId: "u2" },
};
