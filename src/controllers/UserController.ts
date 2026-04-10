
import { success } from "zod";
import logger from "../config/logger";
import { UserSchema, UserUpdateSchema } from "../models/User";
import * as userService from "../services/UserService";
import { Request, Response, NextFunction } from "express";



//add user in the database
export const createUser = async (req: Request, res: Response, next: NextFunction)=>{

  logger.info(`TRY TO ADD NEW USER IN THE DATABASE `)
  const requestBody = UserSchema.safeParse(req.body);

  //si les donnees ne sont pas valides
  if(!requestBody.success)
  {
    logger.info(`INVALID ARGUMENTS`)
    const errors = requestBody.error.issues.map(err =>({
      field : err.path.join("."),
      message: err.message }))

    return res.status(400).json(
      {
        success: false,
        message: "Donnees invalides",
        errors
      })
  }

  const requestBodyData = requestBody.data

  const savedUser = await userService.addUser(requestBodyData)

  if(savedUser)
  {
    logger.info(`NEW USER ADD IN THE DATABASE WITH SUCCESS`)
  }

  return res.status(201).json({
    success: true,
    message: `User ${savedUser!.firstname} created with success`,
    data: savedUser
  })
}

//find user by id
export const findUserById = async (req:Request, res:Response, next: NextFunction) => {
  logger.info(`TRY TO FIND USER BY ID`)

  const user_id:number = parseInt(String(req.params.id)) 

  const userFound = await userService.getUserById(user_id)

  if(!userFound)
  {
    res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  res.status(200).json({
    success : true,
    message: "User found",
    data: userFound
  })
}

// get all users
export const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  const pageNumber = parseInt(String(req.query.page))
  const qty =parseInt(String(req.query.qty))

  const usersFound = await userService.getAllUsers(pageNumber, qty);

  res.status(200)
    .json({
      success: true,
      message: `page ${pageNumber}, ${usersFound.length} users`,
      data: usersFound
    })
}

//delete user 
export const deleteUser = async (req:Request, res: Response, next:NextFunction) =>{
  const user_id = parseInt(String(req.params.id))
  const result =  await userService.deleteUser(user_id)

  res.status(200).json({
    success: true,
    message: "User deleted with success"
  })
}

//update user
export const updatedUser = async (req: Request, res: Response, next: NextFunction) =>{

  const requestBody = UserUpdateSchema.safeParse(req.body)
  //si les donnees ne sont pas valides
  if(!requestBody.success)
  {
    logger.info(`INVALID ARGUMENTS`)
    const errors = requestBody.error.issues.map(err =>({
      field : err.path.slice(1).join("."),
      message: err.message }))

    return res.status(400).json(
      {
        success: false,
        message: "Donnees invalides",
        errors
      })
  }
  const user_id  = parseInt(String(req.params.id))
  const result = await userService.updateUser(user_id, requestBody.data!)

  res.status(201).json({
    success: true,
    message: "Mise a jour profil",
    data: result
  })
}