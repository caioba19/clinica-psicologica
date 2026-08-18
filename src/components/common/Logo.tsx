import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  subtitle?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 38,
  className = '',
  showText = false,
  subtitle,
  light = false
}) => {
  return (
    <div className={`d-inline-flex align-items-center gap-2 ${className}`}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #5cb8a8 0%, #2c5f6e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(44, 95, 110, 0.25)',
          flexShrink: 0
        }}
      >
        <svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Símbolo Internacional de Psicologia (Psi - Ψ) estilizado e moderno */}
          <path d="M12 2v20M4 8c0 4.418 3.582 8 8 8s8-3.582 8-8M4 8V4M20 8V4" />
        </svg>
      </div>

      {showText && (
        <div className="d-flex flex-column text-start">
          <span
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontWeight: 700,
              fontSize: size > 40 ? '20px' : '17px',
              color: light ? '#ffffff' : 'var(--text-primary, #17262b)',
              lineHeight: 1.1
            }}
          >
            PsicoManager
          </span>
          {subtitle && (
            <span
              style={{
                fontSize: '11px',
                color: light ? 'rgba(255,255,255,0.65)' : 'var(--text-muted, #8a989d)',
                marginTop: '2px',
                fontWeight: 500
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
