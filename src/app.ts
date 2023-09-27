import express from 'express'
import userRoutes from "./routes/userRoutes"
import recordRoutes from "./routes/recordRoutes"
import { errorMiddleware } from './middleware/errorHandling'


const app = express()

app.use(express.json())
app.use('/', userRoutes);
app.use('/', recordRoutes)
app.use(errorMiddleware)



export default app
