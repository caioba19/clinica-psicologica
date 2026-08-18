import { useState, type FormEvent } from "react";
import Shell from "../components/Shell";
import { Panel, StatusBadge } from "../components/UI";
import { pacientes as pacientesIniciais, psicologos } from "../mockData";
import type { Paciente } from "../types";

const vazio = { nome: "", contato: "", dataNascimento: "", psicologoId: psicologos[0]?.id ?? "" };

export default function Patients() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciais);
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  function nomePsicologo(id: string) {
    return psicologos.find((p) => p.id === id)?.nome ?? "—";
  }

  function iniciarEdicao(p: Paciente) {
    setEditandoId(p.id);
    setForm({
      nome: p.nome,
      contato: p.contato,
      dataNascimento: p.dataNascimento,
      psicologoId: p.psicologoId,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(vazio);
  }

  function inativar(id: string) {
    setPacientes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, situacao: p.situacao === "ativo" ? "inativo" : "ativo" } : p
      )
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.nome.trim() || !form.contato.trim() || !form.psicologoId) return;

    if (editandoId) {
      setPacientes((prev) =>
        prev.map((p) => (p.id === editandoId ? { ...p, ...form } : p))
      );
    } else {
      const novo: Paciente = {
        id: `pac${Date.now()}`,
        situacao: "ativo",
        ...form,
      };
      setPacientes((prev) => [...prev, novo]);
    }
    cancelarEdicao();
  }

  return (
    <Shell
      kicker="Painel · Administração"
      title="Pacientes"
      subtitle={`${pacientes.filter((p) => p.situacao === "ativo").length} em acompanhamento ativo, vinculados a ${psicologos.length} psicólogos da equipe.`}
    >
      <Panel title={editandoId ? "Editar paciente" : "Novo paciente"}>
        <form className="patient-form" onSubmit={handleSubmit}>
          <label>
            <span>Nome completo</span>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Nome do paciente"
              required
            />
          </label>

          <label>
            <span>Contato</span>
            <input
              value={form.contato}
              onChange={(e) => setForm({ ...form, contato: e.target.value })}
              placeholder="(71) 90000-0000"
              required
            />
          </label>

          <label>
            <span>Data de nascimento</span>
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
              required
            />
          </label>

          <label>
            <span>Psicólogo responsável</span>
            <select
              value={form.psicologoId}
              onChange={(e) => setForm({ ...form, psicologoId: e.target.value })}
            >
              {psicologos.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </label>

          <div className="patient-form-actions">
            <button type="submit" className="pill-button pill-button--solid">
              {editandoId ? "Salvar alterações" : "Cadastrar paciente"}
            </button>
            {editandoId && (
              <button type="button" className="pill-button" onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </Panel>

      <Panel title="Pacientes cadastrados">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Psicólogo</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.contato}</td>
                <td>{nomePsicologo(p.psicologoId)}</td>
                <td><StatusBadge situacao={p.situacao} /></td>
                <td className="patient-actions">
                  <button className="pill-button" onClick={() => iniciarEdicao(p)}>Editar</button>
                  <button className="pill-button" onClick={() => inativar(p.id)}>
                    {p.situacao === "ativo" ? "Inativar" : "Reativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </Shell>
  );
}
