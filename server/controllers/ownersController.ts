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

// updateOwners
// update computedOwnerStats (RSAT, RSYearly, PAT, PYearly, CAT, CYearly)
// update computedH2HStats (RegSzn, Playoffs, and Combined - NO YEARLY)
// update computedMiscellaneousStats (No toggles)

// statCategory: {
//     type: String,
//     enum: ['RegSznYearly', 'PlayoffYearly', 'RegSznAllTime', 'PlayoffAllTime', 'CombinedYearly', 'CombinedAllTime']
// }
