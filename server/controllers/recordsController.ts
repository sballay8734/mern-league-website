import { NextFunction, Request, Response } from "express"
import { errorHandler } from "../utils/error"
import User from "../models/User"
import Records from "../models/Record"

export const getRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const records = await Records.find()
    res.status(200).json(records)
  } catch (error) {
    next(error)
  }
}

export const setRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newRecords = req.body

  console.log(newRecords)

  try {
    if (!req.user) return next(errorHandler(400, "Unauthorized"))

    const userId = req.user.id
    const user = await User.findById(userId)

    if (!user) return next(errorHandler(400, "User not found"))
    if (user.isAdmin === false) return next(errorHandler(400, "Unauthorized"))

    // delete old records
    await Records.deleteMany({})

    // write new data to Records using insertMany
    const updatedRecords = await Records.create({records: newRecords});

    if (!updatedRecords) return next(errorHandler(500, "Something went wrong"))

    res.status(200).json(updatedRecords)
  } catch (error) {
    next(error)
  }
}
