import dotenv from 'dotenv';
import express, { NextFunction } from 'express';
import cors from'cors';
import logger from './config/logger';
import { IncomingMessage, ServerResponse } from 'http';
import { pool } from './config/db';



dotenv.config()

export const app = express()
const PORT = parseInt(process.env.PORT!) || 5000

/**
 * SECURITY MIDDLEWARE
 */
app.use(cors(
  {
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
))

// I will add helmet  later

/**
 * GENERAL MIDDLEWARE
 */
// compression middleware
// cookieParser middleware
// morgan middleware
// urlencoded middleware
// json serializer middleware
app.use(express.json({
  limit:"10mb"
}));


/**
 * Global Rate Limiter middleware
 */



/**
 * API ROUTES
 */
  app.get("/",async (req: IncomingMessage, res, next: NextFunction)=>{
    const queryResult = await pool.query("SELECT * FROM users");
    const rows = queryResult.rows
    res.status(200).json(rows)
  })


/**
 * ERROR HANDLING
 */
//notFound
//errorHandler

/**
 * START SERVER
 */
const start = async ()=>{
  const server = app.listen(PORT, ()=>{
     logger.info(`SERVER RUNNING ON PORT ${PORT}`)
  })

  //CRON JOBS

  //Graceful shutdown
}

start()
  .catch(err =>{
    process.exit(1)
  })

export default app;