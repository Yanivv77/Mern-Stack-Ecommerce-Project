
var winston = require('winston');
require('winston-mongodb');
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.MONGO_URI


const customFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // log the full stack
  winston.format.timestamp(), // get the time stamp part of the full log message
  winston.format.printf(({ level, message, timestamp  }:any) => {
    
    return `${timestamp} ${level}: ${message}  `;
  }),
  winston.format.metadata()
  
  );

  const logger = winston.createLogger({
    format: customFormat,
    transports: [
      new winston.transports.MongoDB({
        db: "mongodb+srv://Yanivv77:Yanivv77@yanivcluster.sziq4.mongodb.net/?retryWrites=true&w=majority",
        collection: 'logs',
      }),
      new winston.transports.File({
        filename: './backend/logs/logs.log',
      }),
    ],
  });
  
 



export { logger }
