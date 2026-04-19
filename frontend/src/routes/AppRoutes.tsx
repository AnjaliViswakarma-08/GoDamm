import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { ProductManager } from '../pages/ProductManager';
import { SupplierManager } from '../pages/SupplierManager';
import { SellProduct } from '../pages/SellProduct';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { OtpVerificationPage } from '../pages/auth/OtpVerificationPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ForgotPasswordOtpPage } from '../pages/auth/ForgotPasswordOtpPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { LandingPage } from '../pages/LandingPage';
import { AppShell } from '../layouts/AppShell';
// PPT imports
import PPTLayout from '../pages/ppt/PPTLayout';
import Overview from '../pages/ppt/Overview';
import Frontend from '../pages/ppt/Frontend';
import Backend from '../pages/ppt/Backend';
import Deployment from '../pages/ppt/Deployment';
import { useAuth } from '../context/AuthContext';
import { GuestRoute, ProtectedRoute } from './RouteGuards';
import { ROUTES } from './paths';

interface AppRoutesProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ darkMode, onToggleTheme }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      {/* PPT Cinematic Architecture Route */}
      <Route path="/ppt" element={<PPTLayout />}>
        <Route index element={<Overview />} />
        <Route path="frontend" element={<Frontend />} />
        <Route path="backend" element={<Backend />} />
        <Route path="deployment" element={<Deployment />} />
      </Route>
      <Route
        path={ROUTES.ROOT}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.APP.DASHBOARD} replace />
          ) : (
            <LandingPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onGoToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
              onGoToRegister={() => navigate(ROUTES.AUTH.REGISTER)}
            />
          )
        }
      />

      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <GuestRoute>
            <LoginPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onGoToRegister={() => navigate(ROUTES.AUTH.REGISTER)}
              onGoToForgotPassword={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
            />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.REGISTER}
        element={
          <GuestRoute>
            <RegisterPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onRegistered={() => navigate(ROUTES.AUTH.VERIFY_OTP)}
              onGoToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
            />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.VERIFY_OTP}
        element={
          <GuestRoute>
            <OtpVerificationPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onVerified={() => navigate(ROUTES.APP.DASHBOARD)}
              onBackToRegister={() => navigate(ROUTES.AUTH.REGISTER)}
            />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={
          <GuestRoute>
            <ForgotPasswordPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onOtpRequested={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD_OTP)}
              onBackToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
            />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD_OTP}
        element={
          <GuestRoute>
            <ForgotPasswordOtpPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onVerified={() => navigate(ROUTES.AUTH.RESET_PASSWORD)}
              onBackToForgotPassword={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
            />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.RESET_PASSWORD}
        element={
          <GuestRoute>
            <ResetPasswordPage
              darkMode={darkMode}
              onToggleTheme={onToggleTheme}
              onPasswordReset={() => navigate(ROUTES.AUTH.LOGIN)}
              onBackToLogin={() => navigate(ROUTES.AUTH.LOGIN)}
            />
          </GuestRoute>
        }
      />

      <Route
        path={ROUTES.APP.ROOT}
        element={
          <ProtectedRoute>
            <AppShell darkMode={darkMode} onToggleTheme={onToggleTheme} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.APP.DASHBOARD} replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductManager />} />
        <Route
          path="suppliers"
          element={<SupplierManager onNavigateToProducts={() => navigate(ROUTES.APP.PRODUCTS)} />}
        />
        <Route path="sell" element={<SellProduct />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? ROUTES.APP.DASHBOARD : ROUTES.PUBLIC.LANDING} replace />}
      />
    </Routes>
  );
};
