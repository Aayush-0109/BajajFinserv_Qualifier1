export interface FibonacciRequest {
  fibonacci: number;
}

export interface PrimeRequest {
  prime: number[];
}

export interface LcmRequest {
  lcm: number[];
}

export interface HcfRequest {
  hcf: number[];
}

export interface AIRequest {
  ai: string;
}

export type BfhlRequest = FibonacciRequest | PrimeRequest | LcmRequest | HcfRequest | AIRequest;
