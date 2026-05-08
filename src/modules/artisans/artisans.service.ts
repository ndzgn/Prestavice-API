import { Artisans } from "@prisma/client";
import { CreateArtisanDTO, UpdateArtisanDTO } from "../../models/Artisan";
import { prisma } from "../../config/Prisma";
import { AppError } from "../../middlewares/errorHandler";


//create artisan profile
export const createArtisan = async (data: CreateArtisanDTO): Promise<Artisans> => {

  const profileFound = await prisma.artisans.findFirst({
    where:{
      OR: [
        { userId: data.userId },
        { email: data.email },
        { phone: data.phone }
      ]
    }
  })

  const userFound = await prisma.users.findUnique({
    where:{
      id: data.userId
    }
  });

   if(!userFound)
  {
    throw new AppError("User not found", 404)
  }


  if(profileFound){
    if(profileFound.userId === data.userId){
      throw new AppError("User already has an artisan profile", 409)
    }

    if(profileFound.email === data.email){
      throw new AppError("Email already in use", 409)
    }
    if(profileFound.phone === data.phone){
      throw new AppError("Phone already in use", 409)
    }
    
  }

 

  const cleanData = {
    ...data,
    email: data.email.toLowerCase().trim(),
    name: data.name.trim(),
    service: data.service.toLowerCase().trim(),
    town: data.town.toLowerCase().trim(),
    district: data.district.toLowerCase().trim()
  }

  try {

    const result = await prisma.artisans.create({
      data: cleanData
    })

    return result

  } catch (error: any) {

    if(error.code === "P2002"){
      throw new AppError("Duplicate field detected", 409)
    }

    throw error
  }
}

//find  artisan by id
export const findArtisanById = async (artisan_id: string): Promise<Artisans> =>{

  const profile = await prisma.artisans.findUnique({
    where:{
      id: artisan_id
    }
  })

  if(!profile)
  {
    throw new AppError("No artisan profile found", 404)
  }

  return profile;
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

//find artisans by town and/or service
export const findArtisansByTownAndService = async(filters:{
  service? : string,
  town?: string
}): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
    where:{
      isActive: true,
      ...(filters.service && {service: filters.service.toLocaleLowerCase().trim()}),
      ...(filters.town && {town: filters.town.toLocaleLowerCase().trim()})
    },
    orderBy: {
      mark: "desc"
    }
  })

  if(profiles.length === 0){
  throw new AppError("No artisans found for given filters", 404)
}

  return profiles;
}



//find active artisans by service
export const findArtisansByService = async (service: string): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
   where:{
    isActive: true,
    AND : {
      service: service.toLocaleLowerCase().trim(),
    }
   }
  })

  if(profiles.length == 0)
  {
    throw new AppError("No artisans found for this service", 404)
  }

  return profiles
}
//find active artisans by town
export const findArtisansByTown = async (town: string): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
    where:{
      isActive: true,
      town: town.toLowerCase().trim()
    }
  })

  if(profiles.length === 0){
    throw new AppError("No artisans found in this town", 404)
  }

  return profiles
}
//find active artisans by district

export const findArtisansByDistrict = async (district: string): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
    where:{
      isActive: true,
      district: district.toLowerCase().trim()
    }
  })

  if(profiles.length === 0){
    throw new AppError("No artisans found in this district", 404)
  }

  return profiles
}
//find all active artisans
export const findAllActiveArtisans = async (): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
    where:{
      isActive: true
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  if(profiles.length === 0){
    throw new AppError("No active artisans found", 404)
  }

  return profiles
}

//update artisan profile
export const updateArtisan = async (artisan_id: string, data: UpdateArtisanDTO): Promise<Artisans> =>{
  await findArtisanById(artisan_id) // on verifie l'existence de l'artisan


  const cleanData = {
    ...data,
    email: data.email?.toLowerCase().trim(),
    name: data.name?.trim(),
    service: data.service?.toLowerCase().trim(),
    town: data.town?.toLowerCase().trim(),
    district: data.district?.toLowerCase().trim()
  }
  const updated = prisma.artisans.update({
    where:{
      id: artisan_id
    },
    data:{
      ...cleanData,
      updatedAt: new Date()
    },
  })

  return updated;
}
//soft delete artisan profile
export const deleteArtisan = async(artisan_id: string): Promise<Artisans> =>{
  await findArtisanById(artisan_id);

  const deleted = await prisma.artisans.update({
    where:{
      id: artisan_id
    },
    data:{
      isActive: false,
      updatedAt: new Date()
    }
  })

  return deleted;
}
//verify artisan
export const verifyArtisan = async (artisan_id: string): Promise<Artisans> =>{

  await findArtisanById(artisan_id)

  const verified = await prisma.artisans.update({
    where:{
      id: artisan_id
    },
    data:{
      isVerified: true
    }
  })

  return verified
}
//find all active verfied artisans
export const findVerifiedArtisans = async (): Promise<Artisans[]> =>{

  const profiles = await prisma.artisans.findMany({
    where:{
      isActive: true,
      isVerified: true
    },
    orderBy:{
      mark: "desc" // par note descendant
    }
  })

  if(profiles.length === 0){
    throw new AppError("No verified artisans found", 404)
  }

  return profiles
}