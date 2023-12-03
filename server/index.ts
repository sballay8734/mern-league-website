import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

import authRouter from "./routes/authRoute"
import recordsRouter from "./routes/recordsRoute"
import ownersRouter from "./routes/ownersRoute"
import kingsRouter from "./routes/kingsRoute"
import updateProfileRouter from "./routes/updateProfileRoute"

import { Err } from "./types/errorTypes"
dotenv.config()

mongoose
  .connect(process.env.mongoURI!)
  .then(() => {
    console.log("Connected to DB!")
  })
  .catch((err) => console.log(err))

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "https://mern-league-website-client.onrender.com",
    credentials: true
  })
)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Running on port ${port}`))

app.get("/", (req: Request, res: Response) => {
  res.send("API HOME!")
})

app.use("/api/auth", authRouter)
app.use("/api/records", recordsRouter)
app.use("/api/owners", ownersRouter)
app.use("/api/kings", kingsRouter)
app.use("/api/profile", updateProfileRouter)

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
