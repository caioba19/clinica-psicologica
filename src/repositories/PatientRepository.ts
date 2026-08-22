import { Paciente } from '../types';

export class PatientRepository {
  private patients: Paciente[] = [
    {
      id: 'pac1',
      nome: 'Lucas Ferreira Mendes',
      email: 'lucas.mendes@email.com',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      dataNasc: '1992-04-15',
      genero: 'Masculino',
      status: 'Ativo',
      convenio: 'Particular',
      psicologoId: 'u2',
      psicologoNome: 'Dra. Sofia Mendes',
      totalSessoes: 12,
      ultimaSessao: '18/08/2026',
      proximaSessao: '25/08/2026 às 14:00',
      avatarColor: '#2b6cb0',
      motivoConsulta: 'Ansiedade generalizada e estresse ocupacional.',
      historico: 'Início do tratamento focado em técnicas cognitivo-comportamentais para regulação de humor.'
    },
    {
      id: 'pac2',
      nome: 'Mariana Costa Ribeiro',
      email: 'mariana.costa@email.com',
      telefone: '(11) 97654-3210',
      cpf: '234.567.890-11',
      dataNasc: '1988-11-20',
      genero: 'Feminino',
      status: 'Ativo',
      convenio: 'SulAmérica',
      psicologoId: 'u2',
      psicologoNome: 'Dra. Sofia Mendes',
      totalSessoes: 8,
      ultimaSessao: '16/08/2026',
      proximaSessao: '23/08/2026 às 10:00',
      avatarColor: '#2f855a',
      motivoConsulta: 'Acompanhamento de transição de carreira e luto recente.',
      historico: 'Evolução favorável na elaboração de metas pessoais.'
    },
    {
      id: 'pac3',
      nome: 'Gabriel Santos Almeida',
      email: 'gabriel.santos@email.com',
      telefone: '(21) 96543-2109',
      cpf: '345.678.901-22',
      dataNasc: '2001-07-03',
      genero: 'Masculino',
      status: 'Em Espera',
      convenio: 'Unimed',
      psicologoId: 'u2',
      psicologoNome: 'Dra. Sofia Mendes',
      totalSessoes: 2,
      ultimaSessao: '10/08/2026',
      proximaSessao: 'Aguardando agendamento',
      avatarColor: '#c05621',
      motivoConsulta: 'Fobia social e dificuldades interpessoais.',
      historico: 'Avaliação inicial concluída.'
    },
    {
      id: 'pac4',
      nome: 'Beatriz Lima Rocha',
      email: 'beatriz.rocha@email.com',
      telefone: '(31) 95432-1098',
      cpf: '456.789.012-33',
      dataNasc: '1995-02-12',
      genero: 'Feminino',
      status: 'Inativo',
      convenio: 'Bradesco Saúde',
      psicologoId: 'u2',
      psicologoNome: 'Dra. Sofia Mendes',
      totalSessoes: 24,
      ultimaSessao: '05/06/2026',
      avatarColor: '#718096',
      motivoConsulta: 'Tratamento de síndrome do pânico.',
      historico: 'Alta clínica concedida após remissão dos sintomas.'
    }
  ];

  async findAll(): Promise<Paciente[]> {
    return this.patients;
  }

  async findById(id: string): Promise<Paciente | null> {
    return this.patients.find((p) => p.id === id) || null;
  }

  async findByCpf(cpf: string): Promise<Paciente | null> {
    return this.patients.find((p) => p.cpf === cpf) || null;
  }

  async create(data: Partial<Paciente>): Promise<Paciente> {
    const newPatient: Paciente = {
      id: `pac_${Date.now()}`,
      nome: data.nome || '',
      email: data.email || '',
      telefone: data.telefone || '',
      cpf: data.cpf || '',
      dataNasc: data.dataNasc || '',
      genero: data.genero || 'Não informado',
      status: data.status || 'Ativo',
      convenio: data.convenio || 'Particular',
      psicologoId: data.psicologoId || 'u2',
      psicologoNome: data.psicologoNome || 'Dra. Sofia Mendes',
      totalSessoes: 0,
      ultimaSessao: 'Sem atendimentos',
      avatarColor: '#2b6cb0',
      motivoConsulta: data.motivoConsulta || '',
      historico: data.historico || ''
    };

    this.patients.unshift(newPatient);
    return newPatient;
  }

  async update(id: string, data: Partial<Paciente>): Promise<Paciente | null> {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.patients[index] = { ...this.patients[index], ...data };
    return this.patients[index];
  }
}