import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'psicologo' | 'paciente'>('psicologo');
  const [email, setEmail] = useState('dra.sofia@psicomanager.com.br');
  const [password, setPassword] = useState('••••••••');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password);
      showToast(
        userType === 'psicologo'
          ? 'Bem-vinda de volta, Dra. Sofia Mendes!'
          : 'Login de paciente realizado com sucesso!',
        'success'
      );
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  const handlePreencherDemo = () => {
    setEmail('demo@psicomanager.com');
    setPassword('demo1234');
    showToast('Credenciais de demonstração preenchidas!', 'info');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Top Navbar Institucional */}
      <header
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF',
          padding: '14px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#173f4b'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #5cb8a8, #2c5f6e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(44, 95, 110, 0.2)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M4 8c0 4.418 3.582 8 8 8s8-3.582 8-8M4 8V4M20 8V4" />
              </svg>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 800, color: '#173f4b' }}>
              Psico<span style={{ color: '#5cb8a8' }}>Manager</span>
            </span>
          </Link>

          <nav className="d-none d-md-flex align-items-center gap-4" style={{ fontSize: '13.5px', fontWeight: 600 }}>
            <Link to="/como-funciona" style={{ color: '#5f6f75', textDecoration: 'none' }}>
              Como funciona
            </Link>
            <Link to="/para-psicologos" style={{ color: '#5f6f75', textDecoration: 'none' }}>
              Para psicólogos
            </Link>
            <Link to="/para-empresas" style={{ color: '#5f6f75', textDecoration: 'none' }}>
              Para empresas
            </Link>
            <Link to="/blog" style={{ color: '#5f6f75', textDecoration: 'none' }}>
              Blog
            </Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/como-funciona"
            className="d-none d-sm-inline-flex"
            style={{
              border: '1px solid #e3eaed',
              backgroundColor: '#fff',
              color: '#2c5f6e',
              borderRadius: '8px',
              padding: '7px 16px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Conhecer Plataforma
          </Link>
          <Link
            to="/"
            style={{
              backgroundColor: '#5cb8a8',
              border: 'none',
              color: '#12343c',
              borderRadius: '8px',
              padding: '7px 20px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <div style={{ flex: 1, display: 'flex', minHeight: 'calc(100vh - 65px)' }} className="flex-column flex-lg-row">
        {/* Painel Esquerdo: Verde Petróleo Profundo (#173f4b) */}
        <div
          style={{
            flex: '1.1',
            backgroundColor: '#173f4b',
            backgroundImage: 'radial-gradient(circle at top right, rgba(92, 184, 168, 0.18) 0%, transparent 65%), radial-gradient(circle at bottom left, rgba(44, 95, 110, 0.3) 0%, transparent 70%)',
            color: '#FFFFFF',
            padding: '48px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Logo / Badge */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #5cb8a8, #3d7a8a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4 8c0 4.418 3.582 8 8 8s8-3.582 8-8M4 8V4M20 8V4" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#fff' }}>PsicoManager</h2>
                <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Gestão Psicológica Integrada
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(92, 184, 168, 0.16)',
                border: '1px solid rgba(92, 184, 168, 0.3)',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#b8e3dc',
                fontWeight: 600,
                marginBottom: '24px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#5cb8a8' }}></span>
              Plataforma Profissional • CFP & LGPD
            </div>

            <h1
              style={{
                fontSize: '34px',
                fontWeight: 700,
                lineHeight: 1.25,
                color: '#FFFFFF',
                fontFamily: 'Playfair Display, Georgia, serif',
                marginBottom: '16px',
                maxWidth: '480px'
              }}
            >
              Cuide de quem <br />
              cuida <em>das pessoas</em>.
            </h1>

            <p
              style={{
                fontSize: '14.5px',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.7,
                maxWidth: '460px',
                marginBottom: '32px'
              }}
            >
              Gerencie sua clínica com agilidade — pacientes, agenda inteligente, prontuários eletrônicos protegidos e financeiro em um só lugar, de qualquer dispositivo.
            </p>

            {/* Checklist de Recursos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(92,184,168,0.18)', color: '#5cb8a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-shield-check"></i>
                </div>
                <span>Dados protegidos com criptografia AES-256</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(92,184,168,0.18)', color: '#5cb8a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-phone"></i>
                </div>
                <span>Acesso mobile, tablet e desktop</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(92,184,168,0.18)', color: '#5cb8a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-calendar3"></i>
                </div>
                <span>Agenda inteligente com lembretes automáticos</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(92,184,168,0.18)', color: '#5cb8a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <span>Relatórios financeiros e estatísticas clínicas</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '40px' }}>
            © 2026 PsicoManager • Todos os direitos reservados.
          </div>
        </div>

        {/* Painel Direito: Formulário de Login (#FFFFFF) */}
        <div
          style={{
            flex: '1',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 36px'
          }}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#17262b',
                  marginBottom: '6px',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}
              >
                Bem-vindo de volta
              </h2>
              <p style={{ fontSize: '13.5px', color: '#5f6f75', margin: 0 }}>
                Faça login para acessar o sistema
              </p>
            </div>

            {/* Toggle Tipo de Usuário (Psicólogo / Paciente) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                backgroundColor: '#f5f7f8',
                padding: '4px',
                borderRadius: '8px',
                marginBottom: '22px'
              }}
            >
              <button
                type="button"
                onClick={() => setUserType('psicologo')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: userType === 'psicologo' ? '#FFFFFF' : 'transparent',
                  color: userType === 'psicologo' ? '#2c5f6e' : '#5f6f75',
                  fontWeight: userType === 'psicologo' ? 700 : 500,
                  fontSize: '13px',
                  boxShadow: userType === 'psicologo' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <i className="bi bi-person-badge"></i>
                Psicólogo
              </button>

              <button
                type="button"
                onClick={() => setUserType('paciente')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: userType === 'paciente' ? '#FFFFFF' : 'transparent',
                  color: userType === 'paciente' ? '#2c5f6e' : '#5f6f75',
                  fontWeight: userType === 'paciente' ? 700 : 500,
                  fontSize: '13px',
                  boxShadow: userType === 'paciente' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <i className="bi bi-person"></i>
                Paciente
              </button>
            </div>

            <form onSubmit={handleLogin}>
              {/* Campo E-mail / Identificador */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#17262b', marginBottom: '6px' }}>
                  {userType === 'psicologo' ? 'E-mail profissional ou CPF' : 'E-mail ou CPF'}
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#e3eaed' }}>
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ borderColor: '#e3eaed', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#17262b', marginBottom: '6px' }}>
                  Senha
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#e3eaed' }}>
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control border-start-0 border-end-0 ps-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderColor: '#e3eaed', fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-white border-start-0 text-muted"
                    style={{ borderColor: '#e3eaed', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Lembrar-me & Esqueci minha senha */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5f6f75', cursor: 'pointer', margin: 0 }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={{ marginTop: 0 }}
                  />
                  Lembrar-me
                </label>

                <Link
                  to="/recuperar-senha"
                  style={{ fontSize: '13px', color: '#2c5f6e', fontWeight: 600, textDecoration: 'none' }}
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão Entrar no Sistema */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: '#2c5f6e',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(44, 95, 110, 0.25)',
                  transition: 'background-color 0.2s, transform 0.1s'
                }}
              >
                {loading ? (
                  <span>Acessando...</span>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Entrar no sistema</span>
                  </>
                )}
              </button>
            </form>

            {/* Caixa de Acesso Demonstração */}
            <div
              style={{
                marginTop: '24px',
                padding: '14px 16px',
                backgroundColor: '#f5f7f8',
                borderRadius: '8px',
                border: '1px solid #e3eaed',
                fontSize: '12.5px',
                color: '#5f6f75'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ color: '#17262b' }}>Acesso demonstração:</strong>
                <span
                  onClick={handlePreencherDemo}
                  style={{ color: '#2c5f6e', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Preencher
                </span>
              </div>
              <div>E-mail: <strong>demo@psicomanager.com</strong></div>
              <div>Senha: <strong>demo1234</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
