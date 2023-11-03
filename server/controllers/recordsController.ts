import { NextFunction, Request, Response } from "express"
import Record from "../models/Record"
import { errorHandler } from "../utils/error"

export const getRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const records = await Record.find()
    res.status(200).json(records)
  } catch (error) {
    next(error)
  }
}

export const updateRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const newRecord = req.body
  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, newRecord, {
      new: true,
      runValidators: true
    })
    if (!updatedRecord) {
      next(errorHandler(404, "Record not found"))
    }
    res.status(200).json(updatedRecord)
  } catch (error) {
    next(error)
  }
}
