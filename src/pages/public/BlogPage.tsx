import React from 'react';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      tag: 'Prontuário & CFP',
      titulo: 'Como manter o prontuário psicológico seguro segundo a Resolução CFP 01/2009',
      data: '15 de Agosto, 2026',
      tempo: '4 min de leitura'
    },
    {
      id: 2,
      tag: 'Clínica & Gestão',
      titulo: '5 estratégias comprovadas para reduzir as faltas de pacientes na clínica',
      data: '10 de Agosto, 2026',
      tempo: '6 min de leitura'
    },
    {
      id: 3,
      tag: 'Terapia Online',
      titulo: 'Boas práticas na telepsicologia: ferramentas seguras e enquadre terapêutico',
      data: '02 de Agosto, 2026',
      tempo: '5 min de leitura'
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
          <Link to="/para-psicologos" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para psicólogos</Link>
          <Link to="/para-empresas" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Para empresas</Link>
          <Link to="/blog" style={{ color: '#5cb8a8', textDecoration: 'none', fontWeight: 700 }}>Blog</Link>
        </nav>

        <Link to="/login" style={{ background: '#5cb8a8', color: '#12343c', padding: '8px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
          Entrar
        </Link>
      </header>

      <main style={{ flex: 1, padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#5cb8a8', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Artigos, Dicas & Atualizações
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
            Blog do PsicoManager
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '650px', margin: '0 auto', fontSize: '15.5px', lineHeight: 1.7 }}>
            Conteúdo especializado para psicólogos, terapeutas e gestores de clínicas de saúde mental.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {posts.map((p) => (
            <div key={p.id} className="col-md-4">
              <div style={{ backgroundColor: '#12262d', borderRadius: '12px', padding: '24px', height: '100%', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#5cb8a8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                  {p.tag}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.4 }}>
                  {p.titulo}
                </h3>
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                  <span>{p.data}</span>
                  <span>{p.tempo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
