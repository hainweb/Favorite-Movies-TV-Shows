export interface Entry {
  id: string;
  title: string;
  type: 'Movie' | 'TV Show';
  director?: string;
  budget?: string;
  location?: string;
  duration?: string;
  year?: string;
  posterUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface PaginatedResponse {
  data: Entry[];
  pagination: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}
