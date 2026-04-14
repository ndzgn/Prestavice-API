import { Artisans } from "@prisma/client";
import { CreateArtisanDTO } from "../../models/Artisan";
import { prisma } from "../../config/Prisma";
import { id } from "zod/locales";
import { AppError } from "../../middlewares/errorHandler";


//create artisan profile
export const createArtisan = async (data:CreateArtisanDTO): Promise<Artisans> =>{

  const profileFound = await prisma.artisans.findUnique({
    where:{
      userId: data.userId,
      email:  data.email,
      name: data.name
    }
  })

  if(profileFound)
  {
    throw new AppError("Artisan already exist", 409)
  }

  const result = await prisma.artisans.create({
    data: {
      ...data
    }
  })

  return result
}

//find  artisan by id
export const findArtisanById = async (artisan_id: string): Promise<Artisans> =>{

  const profileFound = await prisma.artisans.findUnique({
    where:{
      id: artisan_id
    }
  })

  if(!profileFound)
  {
    throw new AppError("No artisan profile found", 404)
  }

  return profileFound;
}

//find artisan by userId
export const findArtisanByUserId = async (user_id: string): Promise<Artisans> =>{
  const profileFound = await prisma.artisans.findUnique({
    where:{
      userId: user_id
    }
  })

  if(!profileFound)
  {
    throw new AppError("No artisan profile found", 404)
  }

  return profileFound
}

//find active artisans by service
export const findArtisansByService = async (service: string): Promise<Artisans[]> =>{

  const profilesFound = await prisma.artisans.findMany({
   where:{
    isActive: true,
    AND : {
      service: service.toLocaleLowerCase().trim()
    }
   }
  })

  if(!profilesFound)
  {
    throw new AppError("No artisans found for this service", 404)
  }

  return profilesFound
}
//find active artisans by town
//find active artisans by district
//find all active artisans
//update artisan profile
//soft delete artisan profile
//verify artisan
//find all active verfied artisans