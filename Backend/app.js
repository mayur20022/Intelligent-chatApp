import express from 'express'
const app = express()
import DBconnect from './db/db.js'
import morgan from 'morgan'

DBconnect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))




app.get("/", (req, res) => {
    res.send("Hello World!")
})


export default app
