import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { LancamentoFinanceiro } from '../../types';
import { useToast } from '../../context/ToastContext';

export const FinanceiroPage: React.FC = () => {
  const { showToast, confirmAction } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');

  const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([
    { id: '1', descricao: 'Sessão Psicoterapia - Lucas Ferreira', pacienteNome: 'Lucas Ferreira', categoria: 'Consultas', data: '17/08/2026', valor: 220.00, tipo: 'receita', status: 'Pago', metodo: 'PIX' },
    { id: '2', descricao: 'Sessão Psicoterapia - Beatriz Santos', pacienteNome: 'Beatriz Santos', categoria: 'Consultas', data: '16/08/2026', valor: 220.00, tipo: 'receita', status: 'Pago', metodo: 'Cartão' },
    { id: '3', descricao: 'Aluguel Sala Consultório 01', categoria: 'Infraestrutura', data: '15/08/2026', valor: 1400.00, tipo: 'despesa', status: 'Pago', metodo: 'Transferência' },
    { id: '4', descricao: 'Supervisão Clínica Mensal', categoria: 'Educação / Supervisão', data: '14/08/2026', valor: 350.00, tipo: 'despesa', status: 'Pago', metodo: 'PIX' },
    { id: '5', descricao: 'Pacote 4 Sessões - Carlos Ramos', pacienteNome: 'Carlos Eduardo Ramos', categoria: 'Pacotes', data: '12/08/2026', valor: 800.00, tipo: 'receita', status: 'Pago', metodo: 'PIX' },
    { id: '6', descricao: 'Sessão Online - Ana Paula', pacienteNome: 'Ana Paula Rodrigues', categoria: 'Consultas', data: '10/08/2026', valor: 200.00, tipo: 'receita', status: 'Pendente', metodo: 'PIX' }
  ]);

  // Form states
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('receita');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Consultas');
  const [metodo, setMetodo] = useState<'PIX' | 'Cartão' | 'Dinheiro' | 'Transferência'>('PIX');

  const totalReceitas = lancamentos
    .filter((l) => l.tipo === 'receita')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalDespesas = lancamentos
    .filter((l) => l.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldoLiquido = totalReceitas - totalDespesas;

  const handleAddLancamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !valor) {
      showToast('Preencha os campos obrigatórios', 'warning');
      return;
    }

    const novo: LancamentoFinanceiro = {
      id: Math.random().toString(),
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      metodo,
      data: 'Hoje',
      status: 'Pago'
    };

    setLancamentos([novo, ...lancamentos]);
    showToast('Lançamento financeiro adicionado com sucesso!', 'success');
    setModalOpen(false);
    setDescricao('');
    setValor('');
  };

  const handleDelete = (id: string, desc: string) => {
    confirmAction(`Deseja excluir o lançamento "${desc}"?`, () => {
      setLancamentos((prev) => prev.filter((l) => l.id !== id));
      showToast('Lançamento removido.', 'success');
    });
  };

  const filteredLancamentos = lancamentos.filter((l) => {
    if (filtroTipo === 'todos') return true;
    return l.tipo === filtroTipo;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestão Financeira</h1>
          <p className="page-subtitle">Fluxo de caixa, recebimentos de sessões, despesas e relatórios de faturamento</p>
        </div>
        <button className="btn-accent" onClick={() => setModalOpen(true)}>
          <i className="bi bi-plus-circle me-1"></i> Novo Lançamento
        </button>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid-4 mb-24">
        <StatCard
          title="Receitas no Mês"
          value={`R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+8.4% vs mês anterior"
          changeType="up"
          icon="arrow-up-circle"
          color="green"
        />
        <StatCard
          title="Despesas no Mês"
          value={`R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="-3.2% vs mês anterior"
          changeType="up"
          icon="arrow-down-circle"
          color="red"
        />
        <StatCard
          title="Saldo Líquido"
          value={`R$ ${saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="Margem saudável"
          changeType="up"
          icon="wallet2"
          color="teal"
        />
        <StatCard
          title="A Receber / Pendentes"
          value="R$ 200,00"
          change="1 fatura pendente"
          changeType="down"
          icon="clock-history"
          color="orange"
        />
      </div>

      {/* Tabela de Lançamentos */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 className="card-title">Extrato de Movimentações</h3>
          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${filtroTipo === 'todos' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFiltroTipo('todos')}
            >
              Todos
            </button>
            <button
              className={`btn btn-sm ${filtroTipo === 'receita' ? 'btn-success text-white' : 'btn-ghost'}`}
              onClick={() => setFiltroTipo('receita')}
            >
              Receitas
            </button>
            <button
              className={`btn btn-sm ${filtroTipo === 'despesa' ? 'btn-danger text-white' : 'btn-ghost'}`}
              onClick={() => setFiltroTipo('despesa')}
            >
              Despesas
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style={{ paddingLeft: '20px' }}>Tipo</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Método</th>
                <th>Status</th>
                <th>Valor</th>
                <th className="text-end" style={{ paddingRight: '20px' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredLancamentos.map((l) => (
                <tr key={l.id}>
                  <td style={{ paddingLeft: '20px' }}>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: l.tipo === 'receita' ? 'rgba(61,170,114,0.12)' : 'rgba(224,92,92,0.12)',
                        color: l.tipo === 'receita' ? 'var(--success)' : 'var(--danger)'
                      }}
                    >
                      <i className={`bi bi-${l.tipo === 'receita' ? 'arrow-down-left' : 'arrow-up-right'}`}></i>
                    </span>
                  </td>
                  <td>
                    <strong>{l.descricao}</strong>
                  </td>
                  <td><span className="badge badge-ghost border">{l.categoria}</span></td>
                  <td className="text-muted small">{l.data}</td>
                  <td><span className="badge badge-info">{l.metodo}</span></td>
                  <td>
                    <span className={`badge ${l.status === 'Pago' ? 'badge-success' : 'badge-warning'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: l.tipo === 'receita' ? 'var(--success)' : 'var(--danger)' }}>
                      {l.tipo === 'receita' ? '+ ' : '- '}
                      R$ {l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </td>
                  <td className="text-end" style={{ paddingRight: '20px' }}>
                    <button
                      type="button"
                      className="action-btn text-danger"
                      title="Excluir lançamento"
                      onClick={() => handleDelete(l.id, l.descricao)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Lançamento */}
      {modalOpen && (
        <div className="modal-backdrop-custom open" onClick={() => setModalOpen(false)}>
          <div className="modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Novo Lançamento Financeiro</h2>
              <button className="action-btn" type="button" onClick={() => setModalOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleAddLancamento}>
              <div className="modal-body">
                <div className="d-flex gap-2 mb-3">
                  <button
                    type="button"
                    className={`btn flex-fill ${tipo === 'receita' ? 'btn-success text-white' : 'btn-ghost'}`}
                    onClick={() => setTipo('receita')}
                  >
                    <i className="bi bi-arrow-down-left me-1"></i> Receita (Entrada)
                  </button>
                  <button
                    type="button"
                    className={`btn flex-fill ${tipo === 'despesa' ? 'btn-danger text-white' : 'btn-ghost'}`}
                    onClick={() => setTipo('despesa')}
                  >
                    <i className="bi bi-arrow-up-right me-1"></i> Despesa (Saída)
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Sessão Psicoterapia - Nome Paciente"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Valor (R$) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      placeholder="0,00"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Forma de Pagamento</label>
                    <select
                      className="form-select"
                      value={metodo}
                      onChange={(e) => setMetodo(e.target.value as any)}
                    >
                      <option value="PIX">PIX</option>
                      <option value="Cartão">Cartão de Crédito/Débito</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Transferência">Transferência Bancária</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="Consultas">Consultas & Sessões</option>
                    <option value="Pacotes">Pacotes Mensais</option>
                    <option value="Infraestrutura">Aluguel / Consultório</option>
                    <option value="Educação / Supervisão">Supervisão / Cursos</option>
                    <option value="Outros">Outras Despesas</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-accent">
                  <i className="bi bi-check-lg me-1"></i> Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
