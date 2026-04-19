export type AppTab = 'dashboard' | 'products' | 'suppliers' | 'sell';

export const ROUTES = {
  ROOT: '/',
  PUBLIC: {
    LANDING: '/',
  },
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    FORGOT_PASSWORD_OTP: '/auth/forgot-password/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
  },
  APP: {
    ROOT: '/app',
    DASHBOARD: '/app/dashboard',
    PRODUCTS: '/app/products',
    SUPPLIERS: '/app/suppliers',
    SELL: '/app/sell',
  },
} as const;

export const TAB_TO_PATH: Record<AppTab, string> = {
  dashboard: ROUTES.APP.DASHBOARD,
  products: ROUTES.APP.PRODUCTS,
  suppliers: ROUTES.APP.SUPPLIERS,
  sell: ROUTES.APP.SELL,
};

export const resolveActiveTab = (pathname: string): AppTab => {
  if (pathname.includes('/products')) {
    return 'products';
  }
  if (pathname.includes('/suppliers')) {
    return 'suppliers';
  }
  if (pathname.includes('/sell')) {
    return 'sell';
  }
  return 'dashboard';
};
