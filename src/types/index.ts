export interface User {
  fullName: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  mobile: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  category?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  mobile?: string;
}
