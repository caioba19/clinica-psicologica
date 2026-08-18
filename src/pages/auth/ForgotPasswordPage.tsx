import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Por favor, informe seu e-mail.', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showToast(`Código de 6 dígitos enviado para ${email}!`, 'success');
    }, 600);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');
    if (enteredCode.length < 6) {
      showToast('Digite o código completo de 6 dígitos.', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      showToast('Código validado com sucesso!', 'success');
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('A nova senha deve ter no mínimo 6 caracteres.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('As senhas não coincidem.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Senha alterada com sucesso! Faça login com a nova senha.', 'success');
      navigate('/login');
    }, 700);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', padding: '32px 16px' }}>
      <div className="card shadow-lg" style={{ maxWidth: '460px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ background: 'var(--bg-sidebar)', padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, var(--accent), var(--primary-light))',
              borderRadius: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M4 8c0 4.418 3.582 8 8 8s8-3.582 8-8M4 8V4M20 8V4" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, margin: 0, color: '#fff' }}>
            Recuperação de Senha
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginTop: '4px', margin: 0 }}>
            {step === 1 && 'Informe seu e-mail cadastrado'}
            {step === 2 && 'Digite o código de 6 dígitos'}
            {step === 3 && 'Crie sua nova senha segura'}
          </p>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <span className={`badge ${step >= 1 ? 'badge-success' : 'badge-ghost'}`}>1. E-mail</span>
            <span className={`badge ${step >= 2 ? 'badge-success' : 'badge-ghost'}`}>2. Código</span>
            <span className={`badge ${step >= 3 ? 'badge-success' : 'badge-ghost'}`}>3. Nova Senha</span>
          </div>
        </div>

        <div className="card-body p-4">
          {step === 1 && (
            <form onSubmit={handleSendEmail}>
              <div className="mb-4">
                <label className="form-label">E-mail Cadastrado</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="seu.email@psicomanager.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-accent w-100 py-2" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Código de Recuperação'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <p className="text-secondary small mb-3 text-center">
                Enviamos o código para <strong>{email}</strong>.
              </p>
              <div className="d-flex justify-content-center gap-2 mb-4">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    className="form-control text-center fs-4 fw-bold"
                    style={{ width: '48px', height: '54px' }}
                  />
                ))}
              </div>
              <button type="submit" className="btn-accent w-100 py-2 mb-2" disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar Código'}
              </button>
              <button
                type="button"
                className="btn-ghost w-100 py-2"
                onClick={() => setStep(1)}
              >
                Voltar e alterar e-mail
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label className="form-label">Nova Senha</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Confirmar Nova Senha</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-accent w-100 py-2" disabled={loading}>
                {loading ? 'Salvando...' : 'Redefinir Senha e Entrar'}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <Link to="/login" className="text-decoration-none small text-muted">
              <i className="bi bi-arrow-left me-1"></i> Voltar para o Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
