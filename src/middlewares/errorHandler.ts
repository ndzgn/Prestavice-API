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


export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) =>{
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errors: unknown[] = [];

  if(err instanceof AppError)
  {
    statusCode = err.statusCode;
    errorMessage = err.message

    if(statusCode < 500)
    {
      logger.warn(`${req.method}/${req.path}: [${statusCode}] [${errorMessage}]`);
    }
    else 
    {
      logger.error(`${req.method}/${req.path}: [${statusCode}] [${errorMessage}]`);
    }
  }
  else if (err instanceof ZodError)
  {
    statusCode = 400;
    errorMessage ="Bad request: Validation Error";

    errors = err.issues.map(e =>({
      field: e.path.join("."),
      message: e.message
    }));

    logger.warn(`${req.method}/${req.path}: [${statusCode}][${errorMessage}]`)
  }
  else {

      errorMessage = err.message
      errors.push(err.stack)
      logger.error(`${req.method}/${req.path}:  [${statusCode}] [${errorMessage}]`, {stack: err.stack});
  }

  res.status(statusCode)
  .json({
    success: false,
    message: errorMessage,
    ...(errors.length > 0 && {error: errors})
  })

  next()
}
