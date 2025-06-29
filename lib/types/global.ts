export interface Artwork {
  id?: string;
  userId?: string;
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
  success: true;
  result: T;
}

export interface ApiArraySuccess<T> {
  success: true;
  result: T[];
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiArraySuccess<T> | ApiError;

//
export interface ParamId {
  id: string;
}
