import cors from "cors";
import express from "express";
import helmet from "helmet";
import { BfhlController } from "./controllers/BfhlController";
import { HealthController } from "./controllers/HealthController";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { limiter } from "./middleware/rateLimiter";
import { validateRequest } from "./middleware/validateRequest";
import { asyncHandler } from "./utils/asyncHandler";

const app = express();
// for security
app.use(helmet());
app.use(
  cors({
    origin: "*"
  })
);
// for rate limiting
app.use(limiter);
// for parsing JSON bodies
app.use(express.json());
// for validating requests

app.post("/bfhl", validateRequest, asyncHandler(BfhlController.handle));
app.get("/health", HealthController.get);
app.use(errorHandler);

let server: ReturnType<typeof app.listen> | null = null;

// prevent server from starting in test environment
if (env.NODE_ENV !== "test" && !process.env.VERCEL) {
  server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

// graceful shutdown
const shutdown = (): void => {
  if (!server) {
    process.exit(0);
    return;
  }

  server.close(() => {
    process.exit(0);
  });
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);

export default app;
