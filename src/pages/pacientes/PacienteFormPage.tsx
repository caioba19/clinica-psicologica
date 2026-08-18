import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const PacienteFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    nome: isEditing ? 'Lucas Ferreira Mendes' : '',
    cpf: isEditing ? '123.456.789-00' : '',
    rg: isEditing ? '12.345.678-9' : '',
    dataNasc: isEditing ? '1992-04-15' : '',
    genero: isEditing ? 'Masculino' : 'Não informado',
    estadoCivil: isEditing ? 'Solteiro(a)' : 'Solteiro(a)',
    profissao: isEditing ? 'Desenvolvedor de Software' : '',
    email: isEditing ? 'lucas.mendes@email.com' : '',
    telefone: isEditing ? '(11) 98765-4321' : '',
    telefoneEmergencia: isEditing ? '(11) 91111-2222' : '',
    contatoEmergenciaNome: isEditing ? 'Carla Ferreira (Irmã)' : '',
    cep: isEditing ? '01310-100' : '',
    endereco: isEditing ? 'Av. Paulista, 1000' : '',
    numero: isEditing ? '1000' : '',
    complemento: isEditing ? 'Apto 42' : '',
    bairro: isEditing ? 'Bela Vista' : '',
    cidade: isEditing ? 'São Paulo' : '',
    uf: isEditing ? 'SP' : 'SP',
    convenio: isEditing ? 'Particular' : 'Particular',
    status: isEditing ? 'Ativo' : 'Ativo',
    motivoConsulta: isEditing ? 'Ansiedade generalizada e estresse ocupacional.' : '',
    historicoSaude: isEditing ? 'Nega doenças crônicas ou cirurgias recentes. Faz uso esporádico de ansiolíticos prescritos.' : '',
    observacoes: isEditing ? 'Prefere sessões nas segundas pela manhã.' : ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cpf || !formData.telefone) {
      showToast('Por favor, preencha os campos obrigatórios (*)', 'warning');
      return;
    }

    showToast(
      isEditing
        ? `Cadastro de ${formData.nome} atualizado com sucesso!`
        : `Paciente ${formData.nome} cadastrado com sucesso!`,
      'success'
    );
    navigate('/pacientes');
  };

  const initials = formData.nome
    ? formData.nome.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'PX';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEditing ? 'Editar Paciente' : 'Novo Paciente'}</h1>
          <p className="page-subtitle">
            {isEditing ? `Atualize as informações cadastrais de ${formData.nome}` : 'Preencha os dados do paciente para abrir seu prontuário'}
          </p>
        </div>
        <Link to="/pacientes" className="btn-ghost">
          <i className="bi bi-arrow-left me-1"></i> Voltar à Lista
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Foto / Cabeçalho Rápido */}
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center gap-3 p-3">
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700
              }}
            >
              {initials}
            </div>
            <div>
              <strong className="d-block fs-5">{formData.nome || 'Novo Paciente'}</strong>
              <span className="text-muted small">Status: {formData.status} • Modalidade: {formData.convenio}</span>
            </div>
          </div>
        </div>

        {/* 1. Dados Pessoais */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title"><i className="bi bi-person me-2 text-primary"></i>1. Dados Pessoais</h3>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Lucas Ferreira Mendes"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">CPF *</label>
                <input
                  type="text"
                  className="form-control"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">RG</label>
                <input
                  type="text"
                  className="form-control"
                  name="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  placeholder="00.000.000-0"
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Data de Nascimento *</label>
                <input
                  type="date"
                  className="form-control"
                  name="dataNasc"
                  value={formData.dataNasc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Gênero</label>
                <select className="form-select" name="genero" value={formData.genero} onChange={handleChange}>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Não-binário">Não-binário</option>
                  <option value="Não informado">Prefiro não informar</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Estado Civil</label>
                <select className="form-select" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange}>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                  <option value="União Estável">União Estável</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Profissão / Ocupação</label>
                <input
                  type="text"
                  className="form-control"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                  placeholder="Ex: Engenheiro"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Contato e Endereço */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title"><i className="bi bi-geo-alt me-2 text-primary"></i>2. Contato & Localização</h3>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">E-mail Principal</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="paciente@email.com"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Telefone / WhatsApp *</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Contato de Emergência</label>
                <input
                  type="text"
                  className="form-control"
                  name="contatoEmergenciaNome"
                  value={formData.contatoEmergenciaNome}
                  onChange={handleChange}
                  placeholder="Nome e Parentesco"
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">CEP</label>
                <input
                  type="text"
                  className="form-control"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Endereço (Rua, Avenida)</label>
                <input
                  type="text"
                  className="form-control"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Rua das Flores, 123"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Cidade / UF</label>
                <input
                  type="text"
                  className="form-control"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="São Paulo - SP"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dados Clínicos & Observações Iniciais */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title"><i className="bi bi-file-medical me-2 text-primary"></i>3. Dados Clínicos & Prontuário</h3>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Tipo de Convênio / Pagamento</label>
                <select className="form-select" name="convenio" value={formData.convenio} onChange={handleChange}>
                  <option value="Particular">Particular</option>
                  <option value="Bradesco Saúde">Bradesco Saúde</option>
                  <option value="SulAmérica">SulAmérica</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Amil">Amil</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Status Inicial</label>
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Ativo">Ativo</option>
                  <option value="Em Espera">Em Espera</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Queixa Principal / Motivo da Procura</label>
              <textarea
                className="form-control"
                rows={3}
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleChange}
                placeholder="Descreva a queixa inicial relatada pelo paciente ou responsável..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Histórico de Saúde Relevante</label>
              <textarea
                className="form-control"
                rows={3}
                name="historicoSaude"
                value={formData.historicoSaude}
                onChange={handleChange}
                placeholder="Medicações em uso, tratamentos anteriores, diagnósticos prévios..."
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="d-flex justify-content-end gap-2 mb-5">
          <Link to="/pacientes" className="btn-ghost">
            Cancelar
          </Link>
          <button type="submit" className="btn-accent">
            <i className="bi bi-check-lg me-1"></i> {isEditing ? 'Salvar Alterações' : 'Concluir Cadastro'}
          </button>
        </div>
      </form>
    </div>
  );
};
