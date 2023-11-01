// sign in & sign up
import { NextFunction, Request, Response } from "express"
import { errorHandler } from "../utils/error"
import bcrypt from "bcrypt"
import User from "../models/User"
import jwt from "jsonwebtoken"

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

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(400, "User not found"))

    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!)

    const userObject = validUser.toObject()
    const { password: pass, ...rest } = userObject

    res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest)
  } catch (error) {
    next(error)
  }
}
