import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRouter from "./routes/authRoute"
import recordsRouter from "./routes/recordsRoute"
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

app.listen(3001)

app.get("/", (req: Request, res: Response) => {
  res.send("API HOME!")
})

app.use("/api/auth", authRouter)
app.use("/api/records", recordsRouter)

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
