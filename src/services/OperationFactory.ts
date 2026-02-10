import { AIService } from "./operations/AIService";
import { FibonacciService } from "./operations/FibonacciService";
import { HcfService } from "./operations/HcfService";
import { LcmService } from "./operations/LcmService";
import { PrimeService } from "./operations/PrimeService";

export type OperationKey = "fibonacci" | "prime" | "lcm" | "hcf" | "ai";

export interface IOperationService {
  execute(input: unknown): Promise<unknown>;
}

export class OperationFactory {
  static getService(key: OperationKey): IOperationService {
    switch (key) {
      case "fibonacci":
        return new FibonacciService();
      case "prime":
        return new PrimeService();
      case "lcm":
        return new LcmService();
      case "hcf":
        return new HcfService();
      case "ai":
        return new AIService();
      default:
        throw new Error("Unsupported operation");
    }
  }
}
