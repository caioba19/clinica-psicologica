import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [matchOpen, setMatchOpen] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#173f4b',
        color: '#FFFFFF',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header Institucional */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#173f4b',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#FFFFFF'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #5cb8a8, #3d7a8a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
            >
              🧠
            </div>
            <span style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Psico<span style={{ color: '#5cb8a8' }}>Manager</span>
            </span>
          </Link>

          {/* Links da Navbar */}
          <nav className="d-none d-md-flex align-items-center gap-4" style={{ fontSize: '14px', fontWeight: 500 }}>
            <Link to="/como-funciona" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>
              Como funciona
            </Link>
            <Link to="/para-psicologos" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>
              Para psicólogos
            </Link>
            <Link to="/para-empresas" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>
              Para empresas
            </Link>
            <Link to="/blog" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>
              Blog
            </Link>
          </nav>
        </div>

        {/* Botões do Topo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            className="d-none d-sm-inline-flex"
            onClick={() => navigate('/como-funciona')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ativar benefício
          </button>
          <Link
            to="/login"
            style={{
              backgroundColor: '#5cb8a8',
              color: '#12343c',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 24px',
              fontSize: '13.5px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(92, 184, 168, 0.3)'
            }}
          >
            Entrar
          </Link>
          <button
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className="bi bi-globe"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 48px',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          position: 'relative'
        }}
        className="flex-column flex-lg-row gap-5"
      >
        {/* Texto Hero */}
        <div style={{ flex: 1, maxWidth: '580px' }}>
          <span
            style={{
              display: 'inline-block',
              color: '#5cb8a8',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '14px'
            }}
          >
            TERAPIA ONLINE & PRESENCIAL
          </span>

          <h1
            style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '28px',
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif'
            }}
          >
            Seu psicólogo a qualquer hora, em qualquer lugar.
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.7,
              marginBottom: '36px'
            }}
          >
            Conectamos você aos melhores psicólogos com prontuário seguro, teleconsultas de alta definição e acompanhamento contínuo em conformidade com o CFP.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/login"
              style={{
                backgroundColor: '#12262d',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Escolher meu psicólogo</span>
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link
              to="/para-psicologos"
              style={{
                backgroundColor: 'rgba(92, 184, 168, 0.15)',
                color: '#b8e3dc',
                border: '1px solid rgba(92, 184, 168, 0.3)',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Sou profissional</span>
            </Link>
          </div>
        </div>

        {/* Visual Hero / Foto com Orgânica Shape */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              height: '400px',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              background: 'linear-gradient(135deg, #2c5f6e, #3d7a8a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Foto Ilustrativa de Acolhimento */}
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '80px', marginBottom: '10px' }}>🧑‍⚕️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Atendimento Humanizado</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Profissionais certificados pelo CFP</p>
            </div>
          </div>

          {/* Card Flutuante "Experimente o PsicoMatch" */}
          {matchOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '0',
                backgroundColor: '#12262d',
                borderRadius: '12px',
                padding: '18px 22px',
                maxWidth: '280px',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 2
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <strong style={{ fontSize: '13.5px', color: '#FFFFFF' }}>Experimente o PsicoMatch!</strong>
                <button
                  type="button"
                  onClick={() => setMatchOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0 }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5, marginBottom: '12px' }}>
                Encontre o psicólogo ideal para sua necessidade em menos de 2 minutos.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5cb8a8',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Iniciar <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
