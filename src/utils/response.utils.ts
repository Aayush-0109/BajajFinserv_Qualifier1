import { env } from "../config/env";
import { ErrorResponse, HealthResponse, SuccessResponse } from "../types/response.types";

export class AppResponse {
  static success<T>(data: T): SuccessResponse<T> {
    return {
      is_success: true,
      official_email: env.OFFICIAL_EMAIL,
      data
    };
  }

  static error(message: string, code: number): ErrorResponse {
    return {
      is_success: false,
      message,
      code
    };
  }

  static health(): HealthResponse {
    return {
      is_success: true,
      official_email: env.OFFICIAL_EMAIL
    };
  }
}
