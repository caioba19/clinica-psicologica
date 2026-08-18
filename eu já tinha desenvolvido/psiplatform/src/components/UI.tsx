import type { ReactNode } from "react";
import type { Situacao } from "../types";
import "./UI.css";

export function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={"stat-card" + (accent ? " stat-card--accent" : "")}>
      <span className="stat-card-value">{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

export function StatusBadge({ situacao }: { situacao: Situacao }) {
  return <span className={`status-badge status-badge--${situacao}`}>{situacao}</span>;
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
