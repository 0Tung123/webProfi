import apiClient from './apiClient';

export interface AdminUser {
  adminId: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  // Admin: Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // Get current user
  getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('admin_user');
    }
  },

  // Store auth data
  storeAuthData(token: string, admin: AdminUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('admin_user', JSON.stringify(admin));
    }
  },
};