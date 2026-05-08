import { Request, Response, NextFunction, CookieOptions } from "express"
import * as authService from './auth.service'
import { AuthRequest } from "../../middlewares/auth.middleware"


const COOKIE_OPTIONS: CookieOptions  = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000 
}

export const register = async(req:Request, res:Response, next:NextFunction):Promise<void> =>{
    try {
        const result = await authService.registerService(req.body)
        res.cookie('refresToken', result.refresToken, COOKIE_OPTIONS)
        res.status(201).json({
            "success": true,
            "message": "Inscription reussie",
            "data": {
                user: result.user,
                accesToken : result.accesToken
            }
        })
    } catch (error) {
        next(error)
    }
}


export const login = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const result = await authService.loginService(req.body)
        res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS)

        res.status(200).json({
             "success": true,
            "message": "Connexion reussiee",
            "data": {
                user: result.user,
                accesToken : result.accesToken
            }
        })
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async(req: Request, res: Response, next:NextFunction): Promise<void> =>{
    try {
        const token = req.cookies?.refreshToken

        if(!token)
        {
            res.status(401).json({
                success: false,
                message: 'Refresh token manquant'
            })

            return;
        }

        const result = await authService.refreshTokenService(token)

        res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS)

        res.status(200).json({
        success: true,
        data: { accessToken: result.accesToken},
    });
    } catch (error) {
        next(error)
    }
}

export const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
    try {
        
        if(req.user)
        {
            await authService.logoutService(req.user.id)
        }

        res.clearCookie('refreshToken')

        res.status(200).json({
            success: true,
            message: 'Deconnexion reussie'
        })
    } catch (error) {
        next(error)
    }
}

export const getMe = async (req:AuthRequest, res:Response, next:NextFunction): Promise<void> =>{
    try {
        res.status(200).json({
            success: true,
            data: {
                user: req.user
            }
        })
    } catch (error) {
        next(error)
    }
}