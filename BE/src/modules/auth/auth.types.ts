export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    adminId: string;
    email: string;
  };
}