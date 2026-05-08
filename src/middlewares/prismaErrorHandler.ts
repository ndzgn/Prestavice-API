import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "./errorHandler";
import logger from "../config/logger";

export const handlePrismaError = (error: unknown, context: string): never => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError("A similar offer already exists", 409);
      case "P2025":
        throw new AppError("Offer not found", 404);
      default:
        logger.error(`Prisma error [${error.code}] during ${context}`, { error });
        throw new AppError("Database error", 500);
    }
  }
  throw error;
};