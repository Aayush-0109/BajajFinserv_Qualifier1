export interface SuccessResponse<T> {
  is_success: true;
  official_email: string;
  data: T;
}

export interface ErrorResponse {
  is_success: false;
  message: string;
  code: number;
}

export interface HealthResponse {
  is_success: true;
  official_email: string;
}
