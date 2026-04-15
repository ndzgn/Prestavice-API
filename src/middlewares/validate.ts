import { Request, Response, NextFunction } from "express"
import { registry, ZodError, ZodSchema } from "zod"
import { AppError } from "./errorHandler"


export const validate = (schema : ZodSchema)=> ((req:Request, res:Response, next:NextFunction)=>{
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if(error instanceof ZodError)
    {
      next(new ZodError(error.issues))
    }
  }
})