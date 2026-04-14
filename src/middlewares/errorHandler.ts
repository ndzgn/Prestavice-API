import { NextFunction, Request, Response } from "express"
import logger from "../config/logger"
import { ZodError } from "zod"

export class AppError extends Error
{
  statusCode: number
  isOperational: boolean

  constructor(message: string, status: number)
  {
    super(message)
    this.statusCode = status
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}


export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {

  let statusCode = 500
  let message = "Une erreur interne est survenue."
  let errors: unknown[] = []

  if (err instanceof AppError) {

    statusCode = err.statusCode
    message = err.message

    if (statusCode < 500) {
      
      logger.warn(`[${req.method}] ${req.path}: ${statusCode}: ${message}`)
    } else {

      logger.error(`[${req.method}] ${req.path} ${statusCode} ${message}`, {
        stack: err.stack
      })
    }
  }

  else {

  
    if (err instanceof ZodError) {
      statusCode = 400
      message = "Erreur de validation"

      errors = err.issues.map((e: any) => ({
        field: e.path.join("."),
        message: e.message
      })) || []
    }


    
    else {
      logger.error(`Unhandled error: ${err.message}`, {
        stack: err.stack
      })
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
}

//not found error
export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Route ${req.originalUrl} introuvable`, 404))
}