import { Request, Response, NextFunction } from "express"

import { errorHandler } from "../utils/error"
import PropSubmission from "../models/PropSubmission"

export const submitProp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(errorHandler(400, "Unauthorized"))

  const propID = req.params.id
  const userID = req.user.id
  const incomingProp = req.body

  try {
    const propExists = await PropSubmission.findOne({ propID, userID })

    if (propExists) {
      const updatedProp = await PropSubmission.findOneAndUpdate(
        { propID, userID },
        // might need to spread the current existing prop to avoid having to write the userID also
        { $set: { ...incomingProp, userID } },
        { new: true }
      )

      res.status(200).json(updatedProp)
    } else {
      const newProp = new PropSubmission({ ...incomingProp, userID })
      const savedProp = await newProp.save()

      if (savedProp) {
        res.status(200).json(savedProp)
      } else {
        next(errorHandler(400, "Error creating prop submission"))
      }
    }
  } catch (error) {
    next(error)
  }
}
