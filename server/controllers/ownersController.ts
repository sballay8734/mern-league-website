import { NextFunction, Request, Response } from "express"
import Owner from "../models/Owner"
import User from "../models/User"
import ComputedOwners from "../models/staticOwnerData"

export const getOwners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owners = await Owner.find()
    console.log(owners)
    res.status(200).json(owners)
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find()
    const userObjects = users.map((user) => user.toObject())

    const usersWithoutPasswords = userObjects.map((user) => {
      const { password, ...rest } = user
      return rest
    })

    res.status(200).json(usersWithoutPasswords)
  } catch (error) {
    next(error)
  }
}

export const getStaticData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staticData = await ComputedOwners.find()
    res.status(200).json(staticData)
  } catch (error) {
    next(error)
  }
}