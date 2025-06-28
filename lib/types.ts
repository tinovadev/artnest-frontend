export interface Artwork {
  id?: string;
  user_id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  description: string;
  imag_url?: string;
  unit_price?: number;
  currency?: string;
  createdAt
}

export interface ApiSuccess<T> {
  success: boolean;
  result: T[];
}

export interface ApiError {
  success: boolean;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
