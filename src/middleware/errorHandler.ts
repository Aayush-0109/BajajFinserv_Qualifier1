import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { AppResponse } from "../utils/response.utils";

type ErrorWithStatus = Error & { statusCode?: number };

export const errorHandler = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err instanceof AppError ? err.statusCode : err.statusCode ?? 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;
  res.status(statusCode).json(AppResponse.error(message, statusCode));
};
