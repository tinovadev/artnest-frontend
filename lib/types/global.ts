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
