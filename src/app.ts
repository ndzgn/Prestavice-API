import dotenv from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';
import cors from'cors';
import logger from './config/logger';


/// on importe les routes ici
import usersRoutes from "./modules/users/users.routes"
import artisansRoutes from "./modules//artisans/artisans.routes"
import offersRoutes from "./modules/Offer/offer.routes"
import authRoutes from "./modules/auth/auth.routes"

import { errorHandler} from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';




dotenv.config()

export const app = express()
const PORT = parseInt(process.env.PORT!) || 5000

/**
 * -----------------------SECURITY MIDDLEWARE---------------
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
 *------------------- GENERAL MIDDLEWARE--------------------
 */
// compression middleware
// cookieParser middleware
// morgan middleware
//request logger middleware
app.use(requestLogger)
// urlencoded middleware
// json serializer middleware
app.use(express.json({
  limit:"10mb"
}));


/**
 * --------------------Global Rate Limiter middleware------------
 */



/**
 * ----------------------API ROUTES--------------------------
 */
  app.use("/api/v1/auth", authRoutes)
  app.use("/api/v1/users", usersRoutes)
  app.use("/api/v1/artisans", artisansRoutes)
  app.use("/api/v1/offers", offersRoutes)
/**
 * -------------------------ERROR HANDLING-----------------------
 */
//errorHandler
app.use(errorHandler)

/**
 * ---------------------------START SERVER----------------------
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