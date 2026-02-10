import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { OperationKey } from "../services/OperationFactory";
import { AppError } from "../utils/AppError";
import { aiSchema, fibonacciSchema, hcfSchema, lcmSchema, primeSchema } from "../validators/validators";

const schemaMap: Record<OperationKey, ZodTypeAny> = {
  fibonacci: fibonacciSchema,
  prime: primeSchema,
  lcm: lcmSchema,
  hcf: hcfSchema,
  ai: aiSchema
};

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const payload = req.body as Record<string, unknown>;
  const keys = Object.keys(payload ?? {});

  if (keys.length !== 1) {
    next(new AppError("Request body must contain exactly one operation key", 400));
    return;
  }

  const rawKey = keys[0];
  const key = (rawKey === "AI" ? "ai" : rawKey) as OperationKey;
  const schema = schemaMap[key];

  if (!schema) {
    next(new AppError("Unsupported operation key", 400));
    return;
  }

  const normalizedPayload = rawKey === key ? payload : { [key]: payload[rawKey] };
  const parsed = schema.safeParse(normalizedPayload);

  if (!parsed.success) {
    next(new AppError(parsed.error.issues[0]?.message ?? "Validation failed", 422));
    return;
  }

  const parsedData = parsed.data as Record<OperationKey, unknown>;
  res.locals.operationKey = key;
  res.locals.inputData = parsedData[key];
  next();
};
