import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"
import { AppError } from "./errorHandler"

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {

    try {
      schema.parse(req.body)
      next()

    } catch (error: any) {

      return next(
        new AppError(
          error.errors?.[0]?.message || "Validation error",
          400
        )
      )
    }
  }