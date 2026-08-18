import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PerfilUsuario } from '../types';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  perfil: PerfilUsuario;
  crp?: string;
  role: string;
  avatarText: string;
  areaAtuacao?: string;
}

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  loginAs: (perfil: PerfilUsuario) => void;
  login: (email: string, pass: string, perfilDesejado?: PerfilUsuario) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

export const mockUsers: Record<PerfilUsuario, UserProfile> = {
  administrador: {
    id: 'u1',
    name: 'Renata Farias',
    email: 'renata@clinica.com',
    perfil: 'administrador',
    role: 'Administradora Geral',
    avatarText: 'RF'
  },
  psicologo: {
    id: 'u2',
    name: 'Dra. Sofia Mendes',
    email: 'dra.sofia@psicomanager.com.br',
    perfil: 'psicologo',
    crp: '06/123456',
    role: 'Psicóloga Clínica (TCC)',
    avatarText: 'DS',
    areaAtuacao: 'Psicologia Clínica'
  },
  paciente: {
    id: 'pac1',
    name: 'Lucas Ferreira Mendes',
    email: 'lucas.mendes@email.com',
    perfil: 'paciente',
    role: 'Paciente / Cliente',
    avatarText: 'LF'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('psico_user');
    return saved ? JSON.parse(saved) : mockUsers.psicologo;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('psico_auth') === 'true';
  });

  const loginAs = (perfil: PerfilUsuario) => {
    const selected = mockUsers[perfil];
    setUser(selected);
    setIsAuthenticated(true);
    localStorage.setItem('psico_user', JSON.stringify(selected));
    localStorage.setItem('psico_auth', 'true');
  };

  const login = (email: string, _pass: string, perfilDesejado?: PerfilUsuario) => {
    let selected: UserProfile;

    if (perfilDesejado) {
      selected = mockUsers[perfilDesejado];
    } else if (email.includes('admin') || email.includes('renata')) {
      selected = mockUsers.administrador;
    } else if (email.includes('paciente') || email.includes('lucas')) {
      selected = mockUsers.paciente;
    } else {
      selected = mockUsers.psicologo;
    }

    setUser(selected);
    setIsAuthenticated(true);
    localStorage.setItem('psico_user', JSON.stringify(selected));
    localStorage.setItem('psico_auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('psico_auth');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem('psico_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginAs, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
