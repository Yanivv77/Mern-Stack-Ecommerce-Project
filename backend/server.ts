import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import {yellow, bold} from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import connectDB from './config/db'

import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import uploadRoutes from './routes/uploadRoutes'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', async (req: express.Request, res: express.Response) => {
  await res.send(process.env.PAYPAL_CLIENT_ID)
})


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', async (req: express.Request, res: express.Response) =>
    await res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
    app.get('/', async (req: express.Request, res: express.Response) => {
    await res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT: number = Number(process.env.PORT) || 5000

if (process.env.JWT_SECRET) {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
  app.listen(PORT,)
}
else {
  console.error('JWT secret is not defined');
  throw new Error('Server error');
}