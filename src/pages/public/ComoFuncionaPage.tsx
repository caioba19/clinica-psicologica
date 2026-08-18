import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ComoFuncionaPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: 'Cadastro & Verificação Profissional',
      desc: 'Psicólogos e clínicas realizam seu cadastro com validação de CRP/CFP e conformidade com as normas éticas e LGPD.',
      icon: 'bi-person-check'
    },
    {
      num: 2,
      title: 'Triagem Inteligente & Agendamento',
      desc: 'Pacientes encontram especialistas por abordagem (TCC, Psicanálise, Humanista) e realizam agendamentos presenciais ou teleconsultas.',
      icon: 'bi-calendar-check'
    },
    {
      num: 3,
      title: 'Sessão Segura & Prontuário Criptografado',
      desc: 'Atendimentos por videochamada ponto-a-ponto com evolução clínica salva em banco de dados protegido com criptografia AES-256.',
      icon: 'bi-shield-lock'
    },
    {
      num: 4,
      title: 'Gestão Financeira & Relatórios',
      desc: 'Controle de pagamentos via PIX/Cartão, emissão automática de recibos/declarações e análise de frequência dos pacientes.',
      icon: 'bi-graph-up-arrow'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#173f4b', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#FFFFFF' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #5cb8a8, #3d7a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🧠
          </div>
          <span style={{ fontSize: '21px', fontWeight: 800 }}>Psico<span style={{ color: '#5cb8a8' }}>Manager</span></span>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-4" style={{ fontSize: '14px', fontWeight: 500 }}>
          <Link to="/como-funciona" style={{ color: '#5cb8a8', textDecoration: 'none', fontWeight: 700 }}>Como funciona</Link>
          <Link to="/para-psicologos" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para psicólogos</Link>
          <Link to="/para-empresas" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para empresas</Link>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div className="d-flex align-items-center gap-3">
          <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '8px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
            Entrar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#5cb8a8', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Plataforma Integrada de Saúde Mental
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
            Como o PsicoManager Funciona?
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '650px', margin: '0 auto', fontSize: '15.5px', lineHeight: 1.7 }}>
            Uma solução ponta a ponta desenvolvida para simplificar a rotina de psicólogos clínicos, organizacionais e institucionais com máxima conformidade ética.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="row g-4 mb-5">
          {steps.map((s) => (
            <div key={s.num} className="col-md-6 col-lg-3">
              <div
                style={{
                  backgroundColor: '#12262d',
                  borderRadius: '12px',
                  padding: '24px',
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.2s, border-color 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveStep(s.num)}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(92, 184, 168, 0.2)',
                    color: '#5cb8a8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    marginBottom: '16px'
                  }}
                >
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#5cb8a8', marginBottom: '6px' }}>
                  ETAPA 0{s.num}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informações de Segurança */}
        <div style={{ backgroundColor: '#12262d', borderRadius: '16px', padding: '36px', border: '1px solid rgba(92, 184, 168, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Segurança e Sigilo Absoluto (CFP & LGPD)
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '14px', margin: 0, maxWidth: '600px' }}>
              Nosso sistema atende integralmente à Resolução CFP nº 01/2009 e à Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>
          <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
            Acessar o Sistema
          </Link>
        </div>
      </main>
    </div>
  );
};
