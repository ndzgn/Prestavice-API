import logger from "../../config/logger";
import { prisma } from "../../config/Prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateUserDTO, toUserResponse, UpdateUserDTO, UserResponseDTO } from "../../models/User";

//create user
export const createUser = async (data: CreateUserDTO): Promise<UserResponseDTO> =>{
  //on verifie si un utilisateur identique existe deja
  const isUserAlreadyExist = await prisma.users.findFirst({
    where:{
      email: data.email,
    },
    select : {
      email: true
    }
  })

  // si oui on leve une erreur
  if(isUserAlreadyExist)
  {
    throw new AppError("User already exist", 409)
  }

  //si non on enregistre le user dans la db
  const result = await prisma.users.create({
    data:{
      ...data
    }
  })

  //on mappe pour ne pas retourne le mot de passe du user
  const response = toUserResponse(result)

  return response
}

//find user by id
export const findUserById = async(user_id: string): Promise<UserResponseDTO> =>{

  const userFound = await prisma.users.findUnique({where:{
    id: user_id
  }})

  if(!userFound)
  {
    throw new AppError("No user found", 404)
  }

  const response = toUserResponse(userFound)
  
  return response
}

//find all users
export const findAllUsers = async(): Promise<UserResponseDTO[]> =>{
  const usersFound = await prisma.users.findMany()

  const response = usersFound.map(user => toUserResponse(user))

  return response
}

//update user
export const updateUser = async(user_id:string, data: UpdateUserDTO) =>{

  const userFound = await prisma.users.findUnique({where:{
    id: user_id
  }})

  if(!userFound)
  {
    throw new AppError("No user found", 404)
  }
  

  const result = await prisma.users.update({
    where:{
      id: user_id
    },
    data:{
      ...data
    }
  })

  const response = toUserResponse(result)

  return response
}

//delete user
export const deleteUser = async(user_id: string)=>{

  const userFound = await prisma.users.findUnique({where:{
    id: user_id
  }})

  if(!userFound)
  {
    throw new AppError("No user found", 404)
  }

  await prisma.users.delete({
    where:{
      id: user_id
    }
  })
}