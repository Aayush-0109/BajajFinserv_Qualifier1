import { Request, Response } from "express";
import { AppResponse } from "../utils/response.utils";

export class HealthController {
  static get(_req: Request, res: Response): void {
    res.status(200).json(AppResponse.health());
  }
}
