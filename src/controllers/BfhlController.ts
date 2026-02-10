import { NextFunction, Request, Response } from "express";
import { OperationFactory, OperationKey } from "../services/OperationFactory";
import { AppResponse } from "../utils/response.utils";

export class BfhlController {
  static async handle(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const operationKey = res.locals.operationKey as OperationKey;
    const inputData = res.locals.inputData as unknown;
    const service = OperationFactory.getService(operationKey);
    const data = await service.execute(inputData);
    res.status(200).json(AppResponse.success(data));
  }
}
