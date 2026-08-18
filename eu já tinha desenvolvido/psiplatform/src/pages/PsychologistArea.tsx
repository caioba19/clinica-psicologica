import Shell from "../components/Shell";
import { Panel, StatusBadge } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { psicologos, pacientes, atendimentos } from "../mockData";

export default function PsychologistArea() {
  const { usuarioAtual } = useAuth();

  const psicologo = psicologos.find((p) => p.usuarioId === usuarioAtual?.id);
  const meusPacientes = pacientes.filter((p) => p.psicologoId === psicologo?.id);
  const meusAtendimentos = atendimentos
    .filter((a) => meusPacientes.some((p) => p.id === a.pacienteId))
    .sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario));

  const proximo = meusAtendimentos[0];
  const restantes = meusAtendimentos.slice(1);

  function nomePaciente(id: string) {
    return meusPacientes.find((p) => p.id === id)?.nome ?? "Paciente";
  }

  if (!psicologo) {
    return (
      <Shell title="Área do psicólogo">
        <Panel title="Perfil não encontrado">
          <p>Não localizamos um cadastro de psicólogo vinculado a este usuário.</p>
        </Panel>
      </Shell>
    );
  }

  return (
    <Shell
      kicker="Painel · Psicólogo(a)"
      title={`Olá, ${psicologo.nome.split(" ")[0]}`}
      subtitle={`Você acompanha ${meusPacientes.length} paciente${meusPacientes.length === 1 ? "" : "s"} e tem ${meusAtendimentos.length} atendimento${meusAtendimentos.length === 1 ? "" : "s"} agendado${meusAtendimentos.length === 1 ? "" : "s"}.`}
    >
      <div className="profile-hero">
        <div className="profile-hero-identity">
          <div className="profile-hero-avatar">{psicologo.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
          <div>
            <p className="profile-hero-name">{psicologo.nome}</p>
            <p className="profile-hero-meta">{psicologo.registro} · {psicologo.areaAtuacao}</p>
            <p className="profile-hero-meta">{psicologo.email}</p>
          </div>
          <StatusBadge situacao={psicologo.situacao} />
        </div>

        <div className="profile-hero-numbers">
          <div className="profile-hero-number">
            <span className="profile-hero-number-value">{meusPacientes.length}</span>
            <span className="profile-hero-number-label">pacientes<br />vinculados</span>
          </div>
          <div className="profile-hero-number profile-hero-number--accent">
            <span className="profile-hero-number-value">{meusAtendimentos.length}</span>
            <span className="profile-hero-number-label">atendimentos<br />agendados</span>
          </div>
        </div>
      </div>

      {proximo && (
        <div className="next-session">
          <span className="next-session-kicker">Próximo atendimento</span>
          <div className="next-session-body">
            <p className="next-session-patient">{nomePaciente(proximo.pacienteId)}</p>
            <p className="next-session-when">{proximo.data} às {proximo.horario}</p>
          </div>
          <span className={`next-session-status ${proximo.confirmado ? "is-confirmed" : ""}`}>
            {proximo.confirmado ? "Confirmado" : "Aguardando confirmação"}
          </span>
        </div>
      )}

      <Panel title="Pacientes vinculados">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Nascimento</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {meusPacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.contato}</td>
                <td>{p.dataNascimento}</td>
                <td><StatusBadge situacao={p.situacao} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {restantes.length > 0 && (
        <Panel title="Demais atendimentos da semana">
          <table className="data-table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Confirmação</th>
              </tr>
            </thead>
            <tbody>
              {restantes.map((a) => (
                <tr key={a.id}>
                  <td>{nomePaciente(a.pacienteId)}</td>
                  <td>{a.data}</td>
                  <td>{a.horario}</td>
                  <td>{a.confirmado ? "Confirmado" : "Aguardando"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </Shell>
  );
}
