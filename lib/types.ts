export interface Artwork {
  id?: string;
  userId: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  description: string;
  imageUrl?: string;
  unitPrice?: number;
  currency?: string;
}

//
export interface ApiSuccess<T> {
  success: boolean;
  result: T[];
}

export interface ApiError {
  success: boolean;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
