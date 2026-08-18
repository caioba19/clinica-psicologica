import React from 'react';
import { Link } from 'react-router-dom';

export const ParaPsicologosPage: React.FC = () => {
  const recursos = [
    {
      titulo: 'Prontuário Eletrônico & Evoluções',
      descricao: 'Registro seguro e rápido de sessões com conformidade ética CFP e histórico do paciente.',
      icon: 'bi-journal-medical'
    },
    {
      titulo: 'Agenda Inteligente com Lembretes',
      descricao: 'Redução de até 80% das faltas e desmarcações com confirmações automatizadas via WhatsApp/SMS.',
      icon: 'bi-calendar3'
    },
    {
      titulo: 'Gestão Financeira Descomplicada',
      descricao: 'Cobrança via PIX automático, controle de fluxo de caixa e emissão facilitada de recibos.',
      icon: 'bi-cash-coin'
    },
    {
      titulo: 'Teleconsulta Integrada (Google Meet)',
      descricao: 'Salas virtuais criptografadas ponta-a-ponto com link gerado com um clique no agendamento.',
      icon: 'bi-camera-video'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#173f4b', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#FFFFFF' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #5cb8a8, #3d7a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🧠
          </div>
          <span style={{ fontSize: '21px', fontWeight: 800 }}>Psico<span style={{ color: '#5cb8a8' }}>Manager</span></span>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-4" style={{ fontSize: '14px', fontWeight: 500 }}>
          <Link to="/como-funciona" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Como funciona</Link>
          <Link to="/para-psicologos" style={{ color: '#5cb8a8', textDecoration: 'none', fontWeight: 700 }}>Para psicólogos</Link>
          <Link to="/para-empresas" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para empresas</Link>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '8px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
          Entrar
        </Link>
      </header>

      <main style={{ flex: 1, padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#5cb8a8', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Autonomia & Eficiência Clínica
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
            A Plataforma Completa Feita por e para Psicólogos
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '680px', margin: '0 auto', fontSize: '15.5px', lineHeight: 1.7 }}>
            Foque no que realmente importa: o cuidado com seus pacientes. O PsicoManager cuida de prontuários, agendamentos, finanças e segurança.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {recursos.map((r, i) => (
            <div key={i} className="col-md-6">
              <div style={{ backgroundColor: '#12262d', borderRadius: '12px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'rgba(92, 184, 168, 0.2)', color: '#5cb8a8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  <i className={`bi ${r.icon}`}></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>{r.titulo}</h3>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, margin: 0 }}>{r.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '14px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '15px', display: 'inline-block' }}>
            Começar Agora no PsicoManager
          </Link>
        </div>
      </main>
    </div>
  );
};
