// sign in & sign up
import { NextFunction, Request, Response } from "express"
import { errorHandler } from "../utils/error"
import bcrypt from "bcrypt"
import User from "../models/User"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, displayName } = req.body

  if (!email || !password || !firstName || !lastName || !displayName) {
    next(errorHandler(400, "All fields are required"))
  }

  const hashedPassword = bcrypt.hashSync(password, 12)

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      displayName
    })
    await newUser.save()
    res.status(200).json({ message: "User created successfully!" })
  } catch (error) {
    // WHY DOES THIS PREVENT APP FROM CRASHING (ASK CHAT GPT)
    next(error)
  }
}

export const signin = (req: Request, res: Response, next: NextFunction) => {
  res.send("Signin route!")
}
