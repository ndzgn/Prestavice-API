import { Pool } from "pg";

export const pool = new Pool({
  connectionString : process.env.POSTGRES_URI,
  max: 30
})