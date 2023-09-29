import express from 'express'
import cors from 'cors';
import userRoutes from "./routes/userRoutes"
import recordRoutes from "./routes/recordRoutes"
import { errorMiddleware } from './middleware/errorHandling'
import corsOptions from '../config/corsOptions'


const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/', userRoutes);
app.use('/', recordRoutes)
app.use(errorMiddleware)



export default app
