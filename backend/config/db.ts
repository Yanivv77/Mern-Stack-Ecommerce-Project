import mongoose, { ConnectOptions } from "mongoose";
import colors from '@colors/colors/safe'
import { logger } from '../logs/logger';


mongoose.set('strictQuery', true);
const connectDB = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI) {
    const conn = await mongoose.connect(process.env.MONGO_URI,{         
      useNewUrlParser: true,
      useUnifiedTopology: true,
 } as ConnectOptions )
    console.log(colors.green(`MongoDB Connected: ${conn.connection.host}`))
    logger.info("Connected to MongoDb", process.env.NODE_ENV);
  }
  } catch (error) {
    if (error instanceof Error) {
    logger.info(error );
    console.error(colors.red(`Error: ${error.message}`))
    process.exit(1)
  }}
}

export default connectDB