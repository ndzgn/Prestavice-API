import { pool } from "../config/db"
import logger from "../config/logger";





const users = [
  {
      lastname: "Ali",
      firstname : "Jean",
      email: "alijean@gmail.com",
      phone_number: "687451230",
      role: "USER",
      town: "Douala",
      district: "Papass"
  },
  {
      lastname: "Tsimi",
      firstname : "Saint Louis",
      email: "tsimisaint@gmail.com",
      phone_number: "658421320",
      role: "USER",
      town: "Yaounde",
      district: "Nkoldong"
  },
  {
      lastname: "Missi",
      firstname : "Yves",
      email: "yvesmissi@gmail.com",
      phone_number: "677459230",
      role: "USER",
      town: "Douala",
      district: "Ndogbong"
  }
]

export const seed = async ()=>{

  try {
    //ON VIDE D'ABORD LES TABLES POUR EVITER LES ERREURS
  const result = await pool.query("DELETE FROM Users");

  users.forEach(async (user) => {
    const result = await pool.query(`INSERT INTO Users (lastname, firstname, email, phone_number, role, town, district) VALUES($1,$2,$3,$4,$5,$6,$7 )`,[user.lastname, user.firstname, user.email, user.phone_number, user.role, user.town, user.district])
  })

  logger.info("seed: 3 users add with success");
  } catch (error) {
    logger.error("Database error")
  }
}


seed()
  .catch(console.error)
