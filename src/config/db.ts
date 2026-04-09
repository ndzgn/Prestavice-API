import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!, 10),
  password: String(process.env.DB_PASSWORD!),
  max: 30
})