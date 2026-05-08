import { Request, Response } from "express"
import { createUserSchema, updateUserSchema } from "../../models/User"
import * as userService from "./users.service"


//create user
export const createUser =  async(req:Request, res:Response)=>{
  const requestBody = createUserSchema.safeParse(req.body)
  if(!requestBody.success)
  {
    const errors = requestBody.error.issues.map(err=>({
      field : err.path.join(""),
      message: err.message
    }))

    res.status(400).json({
      success: false,
      message: "Method argument not valid",
      data: errors
    })
    return
  }

  const bodyData = requestBody.data

  const data = await userService.createUser(bodyData)

  res.status(201).json({
    success: true,
    message: "User create with success",
    data: data
  })
}

//get user by id
export const getUserById = async(req:Request, res:Response)=>{

  const user_id = String(req.params.id)

  const data = await userService.findUserById(user_id)

  res.status(200).json({
    success: true,
    message: "User found with success",
    data: data
  })
}

//get all users
export const getAllUsers = async(req:Request, res: Response)=>{

  const data = await userService.findAllUsers()

  res.status(200).json({
    success: true,
    message: "Retrieve all users",
    data: data
  })
} 

//update user
export const updateUser = async(req:Request, res:Response)=>{

  const requestBody = updateUserSchema.safeParse(req.body)

  const user_id = String(req.params.id)

   if(!requestBody.success)
  {
    const errors = requestBody.error.issues.map(err=>({
      field : err.path.join(""),
      message: err.message
    }))

    res.status(400).json({
      success: false,
      message: "Method argument not valid",
      data: errors
    })
    return
  }

  const bodyData = requestBody.data

  const data = await userService.updateUser(user_id, bodyData)

  res.status(201).json({
    success: true,
    message: "User update with success",
    data: data
  })

}

//delete user
export const deleteUser = async(req:Request, res:Response)=>{

  const user_id = String(req.params.id)

  await userService.deleteUser(user_id)

  res.status(203).json({
    success: true,
    message: "User deleted with success"
  })
}