import express from 'express'
import userRoutes from "./routes/userRoutes"
import recordRoutes from "./routes/recordRoutes"


const app = express()

app.use(express.json())
app.use('/', userRoutes);
app.use('/', recordRoutes)



export default app
