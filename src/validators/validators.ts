import { z } from "zod";

export const fibonacciSchema = z.object({
  fibonacci: z.number().int().nonnegative().max(1000)
});

export const primeSchema = z.object({
  prime: z.array(z.number().int()).min(1).max(10000)
});

export const lcmSchema = z.object({
  lcm: z.array(z.number().int()).min(1).max(1000)
});

export const hcfSchema = z.object({
  hcf: z.array(z.number().int()).min(1).max(1000)
});

export const aiSchema = z.object({
  ai: z.string().min(1).max(500)
});
