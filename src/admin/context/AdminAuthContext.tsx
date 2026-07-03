import { createContext, useContext, useState, type ReactNode } from 'react';
import { api, getToken, setToken, clearToken } from '../lib/api';

interface AdminInfo {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  admin: AdminInfo;
}

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  admin: AdminInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    const stored = localStorage.getItem('tyc-admin-info');
    return stored ? (JSON.parse(stored) as AdminInfo) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(getToken()));

  const login = async (email: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    setToken(res.token);
    localStorage.setItem('tyc-admin-info', JSON.stringify(res.admin));
    setAdmin(res.admin);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem('tyc-admin-info');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
