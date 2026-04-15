import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";


export const requestLogger = (req:Request, res:Response, next:NextFunction)=>{
  const method = req.method
  const path = req.path

  logger.info(`${method} ${path}`)
  next()
}