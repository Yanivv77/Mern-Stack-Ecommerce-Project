import mongoose, { AnyKeys } from 'mongoose'
import colors from '@colors/colors/safe'

mongoose.set('strictQuery', true);
const connectDB = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI) {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(colors.green(`MongoDB Connected: ${conn.connection.host}`))
  }
  } catch (error) {
    if (error instanceof Error) {
    console.error(colors.red(`Error: ${error.message}`))
    process.exit(1)
  }}
}

export default connectDB