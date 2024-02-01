// sign in & sign up
import { NextFunction, Request, Response } from "express"
import { errorHandler } from "../utils/error"
import bcrypt from "bcrypt"
import User from "../models/User"
import jwt from "jsonwebtoken"
import { whitelistedEmails } from "../emailConfig"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastInitial } = req.body

  if (!whitelistedEmails.includes(email)) {
    next(errorHandler(400, "That email has not been whitelisted"))
    return
  }

  if (!email || !password || !firstName || !lastInitial) {
    next(errorHandler(400, "All fields are required"))
    return
  }

  const hashedPassword = bcrypt.hashSync(password, 12)
  const capitalizedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  const capitalizedInitial = lastInitial.toUpperCase()

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName: capitalizedName,
      lastInitial: capitalizedInitial
    })
    await newUser.save()

    const userObject = newUser.toObject()
    const { password, ...rest } = userObject

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  console.log(email, password)

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(400, "User not found"))

    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!)

    // typescript thing
    const userObject = validUser.toObject()
    // take off password
    const { password: pass, ...rest } = userObject

    res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { displayName, email } = req.body

  if (!whitelistedEmails.includes(email)) {
    next(errorHandler(401, "That email has not been whitelisted"))
    return
  }
  // check if user exists
  try {
    const user = await User.findOne({ email })

    if (user) {
      // sign in user if they do
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)
      const userObject = user.toObject()
      const { password: pass, ...rest } = userObject
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      // if not, generate a random password and create a newUser
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)

      const hashedPassword = bcrypt.hashSync(randomPassword, 12)
      // then create them and sign them in

      const firstName =
        displayName.split(" ")[0].charAt(0).toUpperCase() +
        displayName.split(" ")[0].slice(1)

      let lastInitial = ""
      if (displayName.split(" ")[1]) {
        lastInitial = displayName.split(" ")[1].charAt(0).toUpperCase()
      }

      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastInitial
      })
      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!)

      const newUserObject = newUser.toObject()
      const { password: pass, ...rest } = newUserObject

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token")
    res.status(200).json("User has been logged out!")
  } catch (error) {
    next(error)
  }
}
