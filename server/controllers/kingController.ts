import { NextFunction, Request, Response } from "express"
import WeeklyResult from "../models/WeeklyResult"
import KingStanding from "../models/KingStanding"

export const results = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await WeeklyResult.find()
    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

export const standings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Running Standings")
  try {
    const standings = await KingStanding.find()
    res.status(200).json(standings)
  } catch (error) {
    console.log("ERROR GETTING STANDINGS")
    next(error)
  }
}

// need to add updateResults & updateStandings
