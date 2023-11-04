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
