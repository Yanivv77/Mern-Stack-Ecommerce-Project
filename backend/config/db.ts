import mongoose, { AnyKeys } from 'mongoose'
import {cyan, red } from 'colors'
mongoose.set('strictQuery', true);
const connectDB = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI) {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
    mongoose.set('strictQuery', true);
  }
  } catch (error) {
    if (error instanceof Error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }}
}

export default connectDB