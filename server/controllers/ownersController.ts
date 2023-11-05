import { NextFunction, Request, Response } from "express"
import Owner from "../models/Owner"

export const getOwners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owners = await Owner.find()
    res.status(200).json(owners)
  } catch (error) {
    next(error)
  }
}

try {
  // after fetching owners
  // then try to update owner in database
} catch (error) {}

// statCategory: {
//     type: String,
//     enum: ['RegSznYearly', 'PlayoffYearly', 'RegSznAllTime', 'PlayoffAllTime', 'CombinedYearly', 'CombinedAllTime']
// }
