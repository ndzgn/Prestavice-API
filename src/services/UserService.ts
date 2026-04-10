import { pool } from "../config/db";
import { CreateUserDTO, IUser, UpdateUserDTO } from "../models/User";
import logger from "../config/logger";
import { IArtisan } from "../models/Artisan";


//save user in the database
export const addUser = async (data: CreateUserDTO): Promise<IUser|undefined>=>{
 let savedUser: IUser|undefined = undefined;

  try {

    const userAlreadyExist = (await pool.query(`SELECT * FROM Users WHERE email = $1 OR phone_number = $2`, [data.email, data.phone_number])).rowCount

    if(userAlreadyExist! > 0)
    {
      throw new Error("User already exists")
    }

     const result = await pool.query<IUser>(`INSERT INTO Users(
      lastname, firstname, email, phone_number, role, town, district
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [data.lastname, data.firstname, data.email, data.phone_number, data.role, data.town, data.district]);

    if(result.rowCount)
    {
      logger.info(`USER  ${data.lastname} ${data.firstname} saved with success in the database`)
    }

  
    savedUser = result.rows[0];

    //si le user est un artisan on cree une ligne artisan
    if(data.role.toLocaleUpperCase() === "artisan")
    {
      logger.info(`USER  ${data.lastname} ${data.firstname} is an artisan`)
      const result_ = await pool.query<IArtisan>(`
          INSERT INTO Artisans (user_id) VALUES ($1)
        `,[savedUser.id])

      logger.info(`Artisan ${data.lastname} ${data.firstname} saved with success in the database`)
    }

  } catch (error) {
    logger.warn(`${error}`)
  }

  return savedUser;
}


//get user by id
export const getUserById =async (user_id: number): Promise<IUser|undefined> => {
  let foundUser:IUser | undefined;
  try {

    const result = await pool.query<IUser>(`SELECT id, lastname, firstname,email, phone_number, role, town, district FROM Users WHERE id = $1`, [user_id]);

    if(!result) {
      throw new Error("User not found")
    }

    
    foundUser = result.rows[0]

    if(foundUser)
    {
      logger.info(`RETRIVE USER WITH ID: ${user_id}`)
    }

  } catch (error) {
    logger.warn(`${error}`)
  }

  return foundUser;
}


//get all users
export const getAllUsers = async (page: number, qty:number): Promise<IUser[]> =>{

  let usersList: IUser[]|undefined;

  try {
    const result = await pool.query<IUser>(`SELECT id, lastname, firstname,email, phone_number, role, town, district FROM Users LIMIT $1 OFFSET $2`,[qty, page])

    usersList = result.rows;

    if(usersList.length == 0)
    {
      throw new Error("No users in the database")
    }

    logger.info(`RETURN ALL THE USERS`)

  } catch (error) {

    logger.warn(`${error}`)
  }

  return usersList!
}

//update user profile
export const updateUser = async (user_id:number, data:UpdateUserDTO):
Promise<IUser | undefined> =>{

  let updatedUser:IUser|undefined = undefined;
  try {

    const userFound = await getUserById(user_id);

    if(!userFound)
    {
      throw new Error("No user found")
    }
    
    const result = await pool.query<IUser>(`
        UPDATE Users SET 
        lastname = $1,
        firstname = $2,
        email = $3,
        phone_number = $4,
        role = $5,
        town = $6,
        district = $7
        WHERE id = $8
      `, [
         data.lastname || userFound.lastname, 
         data.firstname || userFound.firstname,
         data.email || userFound.email, 
         data.phone_number || userFound.phone_number, 
         data.role || userFound.role, 
         data.town || userFound.town, 
         data.district || userFound.district, 
         user_id])

      updatedUser = result.rows[0]
     if(updatedUser)
     {
       logger.info(`User ${userFound.lastname} updated with success`)
     }

  } catch (error) {
    logger.warn(`Error: ${error}`)
  }

  return updatedUser;
}


//Delete user
export const deleteUser = async(user_id:number): Promise<void> =>{
  try {
    const userFound = await getUserById(user_id);

    if(!userFound)
    {
      throw new Error("User not found")
    }

    const result = await pool.query(`DELETE FROM TABLE WHERE id = $1`, [user_id])
  } catch (error) {
    logger.warn(`Error: ${error}`)
  }
}