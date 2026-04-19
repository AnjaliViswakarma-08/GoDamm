import { Product, Supplier } from '../types/inventory';
import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from '../types/auth';

const API_HOST = (() => {
  const configuredBase = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL)?.trim();
  if (configuredBase) {
    return configuredBase.replace(/\/+$/, '');
  }

  return import.meta.env.DEV ? 'http://localhost:8080' : window.location.origin;
})();
const API_BASE_URL = `${API_HOST}/api`;
const AUTH_BASE_URL = `${API_HOST}/auth`;

function getAuthToken(): string | null {
  return localStorage.getItem('inventory_jwt');
}

function buildHeaders(includeJson: boolean = true): HeadersInit {
  const headers: HeadersInit = includeJson ? { 'Content-Type': 'application/json' } : {};
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleJsonResponse<T>(response: Response, defaultError: string): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = data?.error || data?.message || defaultError;
    throw new Error(message);
  }

  return data as T;
}

export async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = {
    ...buildHeaders(!options.headers || (options.headers as any)['Content-Type'] !== undefined),
    ...(options.headers || {})
  };

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });
}

export async function register(request: RegisterRequest): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'Registration failed');
}

export async function verifyOtp(request: VerifyOtpRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'OTP verification failed');
}

export async function requestPasswordResetOtp(request: ForgotPasswordRequest): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_BASE_URL}/forgot-password/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'Failed to send password reset OTP');
}

export async function verifyForgotPasswordOtp(request: VerifyOtpRequest): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_BASE_URL}/forgot-password/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'Failed to verify OTP');
}

export async function resetForgotPassword(request: ResetPasswordRequest): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_BASE_URL}/forgot-password/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'Failed to reset password');
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  return handleJsonResponse(response, 'Login failed');
}

export async function fetchProducts() {
  const response = await authFetch('/products');
  return handleJsonResponse<Product[]>(response, 'Failed to fetch products');
}

export async function fetchSuppliers() {
  const response = await authFetch('/suppliers');
  return handleJsonResponse<Supplier[]>(response, 'Failed to fetch suppliers');
}

export async function fetchProductById(id: string) {
  const response = await authFetch(`/products/${id}`);
  return handleJsonResponse<Product>(response, 'Failed to fetch product');
}

export async function fetchSupplierById(id: string) {
  const response = await authFetch(`/suppliers/${id}`);
  return handleJsonResponse<Supplier>(response, 'Failed to fetch supplier');
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  const response = await authFetch('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  });
  return handleJsonResponse<Product>(response, 'Failed to add product');
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const response = await authFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product)
  });
  return handleJsonResponse<Product>(response, 'Failed to update product');
}

export async function deleteProduct(id: string) {
  const response = await authFetch(`/products/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return true;
}

export async function addSupplier(supplier: Omit<Supplier, 'id'>) {
  const response = await authFetch('/suppliers', {
    method: 'POST',
    body: JSON.stringify(supplier)
  });
  return handleJsonResponse<Supplier>(response, 'Failed to add supplier');
}

export async function updateSupplier(id: string, supplier: Partial<Supplier>) {
  const response = await authFetch(`/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(supplier)
  });
  return handleJsonResponse<Supplier>(response, 'Failed to update supplier');
}

export async function deleteSupplier(id: string) {
  const response = await authFetch(`/suppliers/${id}`, { method: 'DELETE' });

  if (response.ok) {
    return { success: true };
  }

  const text = await response.text();
  const errorData = text ? JSON.parse(text) : {};

  if (response.status === 409) {
    return {
      success: false,
      status: 409,
      message: errorData.message || 'Cannot delete supplier with linked products',
      error: errorData.error,
      timestamp: errorData.timestamp
    };
  }

  return {
    success: false,
    status: response.status,
    message: errorData.error || 'Failed to delete supplier'
  };
}

export async function updateStoreName(newName: string) {
  const response = await authFetch('/user/store-name', {
    method: 'PUT',
    body: JSON.stringify({ storeName: newName })
  });
  return handleJsonResponse<any>(response, 'Failed to update store name');
}
