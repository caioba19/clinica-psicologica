import React from 'react';
import { Link } from 'react-router-dom';

export const ParaEmpresasPage: React.FC = () => {
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
          <Link to="/para-psicologos" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para psicólogos</Link>
          <Link to="/para-empresas" style={{ color: '#5cb8a8', textDecoration: 'none', fontWeight: 700 }}>Para empresas</Link>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '8px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
          Entrar
        </Link>
      </header>

      <main style={{ flex: 1, padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#5cb8a8', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Saúde Mental Corporativa
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
            Benefício de Saúde Mental para sua Equipe
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '650px', margin: '0 auto', fontSize: '15.5px', lineHeight: 1.7 }}>
            Reduza o absenteísmo, previna o burnout e aumente o engajamento dos colaboradores com acompanhamento psicológico profissional e relatórios de clima organizacional.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div style={{ backgroundColor: '#12262d', borderRadius: '12px', padding: '24px', height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', color: '#5cb8a8', marginBottom: '12px' }}><i className="bi bi-heart-pulse"></i></div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Cuidado Preventivo</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>Identificação precoce de estresse ocupacional e suporte especializado para colaboradores.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ backgroundColor: '#12262d', borderRadius: '12px', padding: '24px', height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', color: '#5cb8a8', marginBottom: '12px' }}><i className="bi bi-bar-chart-steps"></i></div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Métricas & Dashboards</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>Relatórios anônimos de utilização para o RH acompanhar o impacto do benefício.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ backgroundColor: '#12262d', borderRadius: '12px', padding: '24px', height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', color: '#5cb8a8', marginBottom: '12px' }}><i className="bi bi-shield-check"></i></div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Sigilo 100% Garantido</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>Total confidencialidade dos prontuários e atendimentos conforme o código de ética do CFP.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
