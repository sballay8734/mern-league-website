import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Running on port ${port}`))

app.use("/api/auth", authRouter)
app.use("/api/records", recordsRouter)
app.use("/api/owners", ownersRouter)
app.use("/api/kings", kingsRouter)
app.use("/api/profile", updateProfileRouter)

const clientDistPath = path.join(__dirname, "../../client/dist")
console.log("Client Dist Path:", clientDistPath)
app.use(express.static(clientDistPath))

// Adjusted path for sending the index.html file
const indexPath = path.join(__dirname, "../../client/dist/index.html")
console.log("Index HTML Path:", indexPath)
app.get("*", (req: Request, res: Response) => {
  res.sendFile(indexPath)
})

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
