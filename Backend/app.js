import express from 'express'
const app = express()
import DBconnect from './db/db.js'
import morgan from 'morgan'
import userRouter from './router/userRouter.js'
import cookieParser from "cookie-parser"
import cors from "cors"
DBconnect()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.use("/users",userRouter)







export default app
