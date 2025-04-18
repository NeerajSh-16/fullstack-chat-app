import express from 'express'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { app, server, io } from './lib/socket.js'
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json({ limit: "10mb" }));//will allow to extract json data out of body
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
//above two lines are updated with 'limit' attribute to solve the issue of profile pic not updating
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
    connectDB()
})