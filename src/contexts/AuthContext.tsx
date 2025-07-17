import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileType } from '@/types/user';
import axios from '@/lib/axiosInstance';

interface User {
  id: string;
  email: string;
  name: string;
  profileType: ProfileType;
  createdAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    profileType: ProfileType,
    nomEntreprise?: string
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('plantera_token'));
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (jwtToken: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (!response.ok) throw new Error('Impossible de récupérer le profil');

      const userDataFromBackend = await response.json();
      const rawProfil = userDataFromBackend.profil;
      if (!rawProfil) throw new Error('Le profil est manquant');

      const userData: User = {
        id: userDataFromBackend.id,
        email: userDataFromBackend.email,
        name: userDataFromBackend.nom,
        profileType: rawProfil.toLowerCase() as ProfileType,
        createdAt: new Date().toISOString(),
        avatar: '',
      };

      setUser(userData);
      localStorage.setItem('plantera_user', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
      setUser(null);
      localStorage.removeItem('plantera_user');
      localStorage.removeItem('plantera_token');
      setToken(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const register = async (
    email: string,
    password: string,
    name: string,
    profileType: ProfileType,
    nomEntreprise?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const payload = {
        nom: name,
        email,
        motDePasse: password,
        profil: profileType.toUpperCase(),
        nomEntreprise: nomEntreprise || '',
      };

      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur HTTP ${response.status}:`, errorText);
        throw new Error(errorText || 'Erreur inconnue');
      }

      const data = await response.json();
      const jwtToken = data.token;
      if (!jwtToken) throw new Error("Le token n'a pas été retourné");

      localStorage.setItem('plantera_token', jwtToken);
      setToken(jwtToken);

      await fetchUser(jwtToken);
      return true;
    } catch (error) {
      console.error('Erreur d’inscription :', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur login (${response.status}):`, errorText);
        throw new Error('Email ou mot de passe incorrect');
      }

      const { token: jwtToken } = await response.json();

      localStorage.setItem('plantera_token', jwtToken);
      setToken(jwtToken);

      await fetchUser(jwtToken);
      return true;
    } catch (error) {
      console.error('Erreur de connexion :', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('plantera_user');
    localStorage.removeItem('plantera_token');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const permissions: Record<ProfileType, string[]> = {
      agriculteur: ['cultures', 'livestock', 'irrigation', 'analytics', 'marketplace', 'sales'],
      veterinaire: ['livestock-view', 'marketplace'],
      grossiste: ['marketplace'],
      gie: ['marketplace'],
      vendeur: ['marketplace'],
      acheteur: ['marketplace'],
      investisseur: ['marketplace'],
    };

    return permissions[user.profileType]?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};
