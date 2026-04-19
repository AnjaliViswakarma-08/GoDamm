import React, { createContext, useContext, useState } from 'react';
import * as api from './api';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../types/auth';

type OtpFlow = 'register' | 'forgot-password' | null;

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  pendingEmail: string;
  otpFlow: OtpFlow;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  startForgotPassword: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resetForgotPassword: (newPassword: string) => Promise<void>;
  updateStoreName: (newName: string) => Promise<void>;
  logout: () => void;
  setPendingEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const JWT_STORAGE_KEY = 'inventory_jwt';
const USER_STORAGE_KEY = 'inventory_user';

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistAuth(response: AuthResponse) {
  localStorage.setItem(JWT_STORAGE_KEY, response.token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
    userId: response.userId,
    email: response.email,
    storeName: response.storeName
  }));
}

function clearStoredAuth() {
  localStorage.removeItem(JWT_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(JWT_STORAGE_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [pendingEmail, setPendingEmail] = useState('');
  const [otpFlow, setOtpFlow] = useState<OtpFlow>(null);
  const [verifiedResetOtp, setVerifiedResetOtp] = useState('');

  const login = async (request: LoginRequest) => {
    const response = await api.login(request);
    persistAuth(response);
    setToken(response.token);
    setUser({ userId: response.userId, email: response.email, storeName: response.storeName });
  };

  const register = async (request: RegisterRequest) => {
    await api.register(request);
    setPendingEmail(request.email.trim().toLowerCase());
    setOtpFlow('register');
    setVerifiedResetOtp('');
  };

  const startForgotPassword = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    await api.requestPasswordResetOtp({ email: normalizedEmail });
    setPendingEmail(normalizedEmail);
    setOtpFlow('forgot-password');
    setVerifiedResetOtp('');
  };

  const verifyOtp = async (otp: string) => {
    if (!pendingEmail) {
      throw new Error('No email available for OTP verification. Please register again.');
    }

    if (otpFlow === 'forgot-password') {
      await api.verifyForgotPasswordOtp({ email: pendingEmail, otp });
      setVerifiedResetOtp(otp);
      return;
    }

    const response = await api.verifyOtp({ email: pendingEmail, otp });
    persistAuth(response);
    setToken(response.token);
    setUser({ userId: response.userId, email: response.email, storeName: response.storeName });
    setPendingEmail('');
    setOtpFlow(null);
    setVerifiedResetOtp('');
  };

  const resetForgotPassword = async (newPassword: string) => {
    if (!pendingEmail || !verifiedResetOtp || otpFlow !== 'forgot-password') {
      throw new Error('Password reset session not found. Please request OTP again.');
    }

    await api.resetForgotPassword({
      email: pendingEmail,
      otp: verifiedResetOtp,
      newPassword,
    });

    setPendingEmail('');
    setOtpFlow(null);
    setVerifiedResetOtp('');
  };

  const updateStoreName = async (newName: string) => {
    const updatedUser = await api.updateStoreName(newName);
    const newUser = { ...user!, storeName: updatedUser.storeName };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setPendingEmail('');
    setOtpFlow(null);
    setVerifiedResetOtp('');
  };

  const value = {
    user,
    token,
    pendingEmail,
    otpFlow,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    startForgotPassword,
    verifyOtp,
    resetForgotPassword,
    updateStoreName,
    logout,
    setPendingEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
