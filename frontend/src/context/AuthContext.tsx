import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('lemon_token');
    const storedUser = localStorage.getItem('lemon_user');
    
    if (token && storedUser) {
      authAPI.setAuthToken(token);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response.data as { token: string; user: User };
      
      localStorage.setItem('lemon_token', token);
      localStorage.setItem('lemon_user', JSON.stringify(userData));
      
      authAPI.setAuthToken(token);
      
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: User) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user: registeredUser } = response.data as { token: string; user: User };
      
      localStorage.setItem('lemon_token', token);
      localStorage.setItem('lemon_user', JSON.stringify(registeredUser));
      
      authAPI.setAuthToken(token);
      
      setUser(registeredUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('lemon_token');
    localStorage.removeItem('lemon_user');
    
    authAPI.removeAuthToken();
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};