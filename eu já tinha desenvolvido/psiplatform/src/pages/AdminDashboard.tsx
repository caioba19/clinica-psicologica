import { useState } from "react";
import Shell from "../components/Shell";
import { Panel, StatCard, StatusBadge } from "../components/UI";
import { usuarios as usuariosIniciais, psicologos, pacientes, logs } from "../mockData";
import type { Situacao, Usuario } from "../types";

function proximaSituacao(atual: Situacao): Situacao {
  if (atual === "ativo") return "bloqueado";
  return "ativo";
}

export default function AdminDashboard() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciais);

  const totalPsicologos = psicologos.length;
  const totalPacientes = pacientes.length;
  const totalAtivos = usuarios.filter((u) => u.situacao === "ativo").length;

  function alternarSituacao(id: string) {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, situacao: proximaSituacao(u.situacao) } : u))
    );
  }

  return (
    <Shell
      kicker="Painel · Administração"
      title="Como a clínica está hoje"
      subtitle={`${totalAtivos} de ${usuarios.length} contas ativas · ${totalPsicologos} psicólogos credenciados · ${totalPacientes} pacientes em acompanhamento.`}
    >
      <div className="dashboard-highlight-row">
        <div className="highlight-panel">
          <span className="highlight-panel-kicker">Resumo</span>
          <p className="highlight-panel-text">
            A equipe conta hoje com <strong>{totalPsicologos} psicólogos</strong> credenciados,
            responsáveis por <strong>{totalPacientes} pacientes</strong> ativos. Um usuário está
            bloqueado e um está inativo — vale checar o registro de atividades abaixo antes de
            liberar novo acesso.
          </p>
        </div>
        <div className="stat-stack">
          <StatCard label="Contas ativas" value={totalAtivos} accent />
          <StatCard label="Psicólogos credenciados" value={totalPsicologos} />
          <StatCard label="Pacientes em acompanhamento" value={totalPacientes} />
        </div>
      </div>

      <Panel title="Usuários da plataforma">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Situação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td style={{ textTransform: "capitalize" }}>{u.perfil}</td>
                <td><StatusBadge situacao={u.situacao} /></td>
                <td>
                  <button className="pill-button" onClick={() => alternarSituacao(u.id)}>
                    {u.situacao === "ativo" ? "Bloquear" : "Ativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Últimas ações registradas no sistema">
        <table className="data-table">
          <thead>
            <tr>
              <th>Autor</th>
              <th>Ação</th>
              <th>Data e hora</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td>{l.autor}</td>
                <td>{l.acao}</td>
                <td>{l.dataHora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </Shell>
  );
}
