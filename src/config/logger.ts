import path, { dirname } from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const {combine, printf, colorize, timestamp, json, errors} = winston.format


//Log format
const logFormat = printf(({message, timestamp, level, stack, ...meta})=>{

  const baseLayer = `${process.env.APP_NAME?.toLocaleUpperCase()}\\src\\app.ts`

  const layer = Object.keys(meta).length > 0 ? `${baseLayer}\\modules\\${meta.layer}` : baseLayer

  let log = `[${timestamp}] [${layer}] [${level}]: ${message}`

  if(stack) log += `\n${stack}`

  return log
})


const logsDir = path.join(process.cwd(), "logs")

//log transport

const transports: winston.transport[] = [
  //en console
  new winston.transports.Console({
    format: combine(
      colorize({all: true}),
      timestamp({format: "DD/MM/YYYY HH:mm:ss"}),
      errors({stack: true}),
      logFormat
    ),

  })
]


// fichiers rotatifs uniquement en production
if(process.env.NODE_ENV === "production")
{
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d',
      maxSize:  '20m',
      format: combine(
        timestamp(), json(), errors({stack: true})
      )
    }),
    new DailyRotateFile({
      filename: path.join(logsDir, 'combined-%DATE%.log'),
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      maxSize: "20m",
      format: combine(
        timestamp(), errors({stack: true}), json()
      )
    })
  )
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "prodcution" ? "info": "debug"),
  transports,
  exitOnError: false,
})

export default logger