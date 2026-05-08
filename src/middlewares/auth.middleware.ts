import { Users } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { AppError } from "./errorHandler";
import jwt from 'jsonwebtoken'
import { prisma } from "../config/Prisma";
import logger from "../config/logger";
export interface AuthRequest extends Request{
    user?: Users
}

export const authenticate = async (
    req:AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void>=>{

    try {
        
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer "))
        {
            throw new AppError("Non authentifie. Token manquant", 401)
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string}
        const user = await prisma.users.findFirst({
            where:{
                id: decoded.userId
            }
        })

        if(!user)
        {
            throw new AppError("Utilisateur non trouve", 401)
        }

        req.user = user

        next();

    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError)
        {
            next(new AppError("Token invalide", 401))
        }
        else if(error instanceof jwt.TokenExpiredError)
        {
            next(new AppError("Token expire. veuillez vous reconnecter", 401))
        }
        else
        {
            next(error)
        }
    }
}

export const authorize = (...roles: string[]) => {
    return (req:AuthRequest, res:Response, next:NextFunction): void =>{
        if(!req.user)
        {
            next(new AppError("Non authentifie", 401))
            return;
        }

        if(!roles.includes(req.user.role))
        {
            logger.warn(`Unauthorized access attempt by user ${req.user.id} with role ${req.user.role}`)
            next(new AppError('Acces refuse.', 403))
            return;
        }

        next()
    }
}