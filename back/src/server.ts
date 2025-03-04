import express from 'express'
import cors from 'cors'
import initRoutes from './routes/routes.ts'
import dotenv from 'dotenv';

dotenv.config(); // thats make possible acess the .enc content


const app = express()
const port = 8080

app.use(cors({
    origin: '*'
}))

initRoutes(app)

app.listen(port, () => console.log(`acesse : http://localhost:${port}/`))

