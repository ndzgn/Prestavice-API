import bcrypt from "bcryptjs"
import { prisma } from "../../config/Prisma"
import { AppError } from "../../middlewares/errorHandler"
import { loginDTO, registerDTO } from "./auth.schema"
import  jwt  from "jsonwebtoken"
import { toUserResponse } from "../../models/User"
import { CreateArtisanDTO } from "../../models/Artisan"
import { createArtisan } from "../artisans/artisans.service"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.utils"
import logger from "../../config/logger"
import { email } from "zod"


export const registerService = async (data:registerDTO & {phone?: string, town?: string, district?: string, service?: string, pictureUrl?: string})=>{

    const existing = await prisma.users.findFirst({
        where: {
            email: data.email
        }
    })

    if(existing)
    {
        throw new AppError("Cet email est deja utilise", 409)
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const {password, ...rest} = data

    const user = await prisma.users.create({
        data:{
            password: hashedPassword,
            ...rest
        }
    })

   

    const accesToken = generateAccessToken(user.id, user.role)
    const refresToken = generateRefreshToken(user.id)

    user.refreshToken = refresToken;
    await prisma.users.update({
        where:{
            email: user.email
        },

        data :{
            refreshToken: refresToken
        }
    })

    logger.info(`New user registered: ${user.email} ${user.id}`)


     if(data.role == "ARTISAN")
    {
        const artisanData: CreateArtisanDTO = {
            userId: user.id,
            district: data.district as string,
            email: data.email,
            phone: data.phone as string,
            name: data.username,
            service: data.service as string,
            town: data.town as string,
            pictureUrl: data.pictureUrl
        }

        const artisan = await createArtisan(artisanData)

        logger.info(`New artisan registered: ${artisan.email} ${artisan.id}`)
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            username: user.username
        },
        accesToken,
        refresToken
    }
}


export const loginService = async (data:loginDTO) =>{

    const user = await prisma.users.findFirst({
        where:{
            email: data.email
        },
    })

    if(!user)
    {
        throw new AppError("Email ou mot de passe incorrect", 401)
    }


    const isPasswordMatch = await bcrypt.compare(data.password, user?.password)

    if(!isPasswordMatch)
    {
        logger.warn(`Echec de connexion pour email: ${data.email}`)
        throw new AppError("Email ou mot de passe incorrect", 401)
    }

    const accesToken = generateAccessToken(user.id, user.role)
    const refreshToken = generateRefreshToken(user.id)

    user.refreshToken = refreshToken

    await prisma.users.update({
        where:{
            email: user.email
        },
        data:{
            refreshToken: refreshToken
        }
    })

    logger.info(`User logged in: ${user.email}`)
    return {user, accesToken, refreshToken}

}


export const refreshTokenService =async (token:string)=>{
    const decoded = verifyRefreshToken(token)

    const user = await prisma.users.findFirst({
        where: {
            id: decoded.userId
        },
    })

    if(!user || user.refreshToken != token)
    {
        throw new AppError(`Refresh token invalide`, 401)
    }

    const accesToken = generateAccessToken(user.id, user.role)
    const newRefreshToken = generateRefreshToken(user.id)

    user.refreshToken = newRefreshToken

    await prisma.users.update({
        where:{
            id: user.id
        },
        data:{
            refreshToken: newRefreshToken
        }
    })

    return {accesToken, refreshToken: newRefreshToken}
}


export const logoutService = async (userId: string) =>{
    const user = await prisma.users.update({
        where:{
            id: userId
        },
        data:{
            refreshToken: null
        }
    })

    
}
