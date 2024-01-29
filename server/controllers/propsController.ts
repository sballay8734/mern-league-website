import { Request, Response, NextFunction } from "express"

import { errorHandler } from "../utils/error"
import PropSubmission from "../models/PropSubmission"
import Prop from "../models/Prop"

export const submitProp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(errorHandler(400, "Unauthorized"))

  const propID = req.params.id
  const userID = req.user.id
  const incomingProp = req.body

  if (incomingProp.endDate) {
    const propEndDate = new Date(incomingProp.endDate)
    const currentDate = new Date()

    // Check if the prop's endDate is before the current date
    if (propEndDate < currentDate) {
      return next(errorHandler(400, "Game has already started"))
    }
  }

  try {
    const propExists = await PropSubmission.findOne({ propID, userID })

    if (propExists) {
      const updatedProp = await PropSubmission.findOneAndUpdate(
        { propID, userID },
        // might need to spread the current existing prop to avoid having to write the userID also
        { $set: { ...incomingProp, userID } },
        { new: true, runValidators: true }
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

export const createProps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const props = req.body.props
  const weekYear = req.body.weekYear
  const user = req.user

  if (!user) return next(errorHandler(400, "Unauthorized"))

  if (props.length < 1 || !weekYear) return next(errorHandler(400, "ERROR!"))

  const propsAlreadyExistForWeek = await Prop.findOne({ weekYear: weekYear })

  if (propsAlreadyExistForWeek) {
    res.status(500).json("Props have already been set for this week")
    return
  } else {
    try {
      const newProps = await Prop.insertMany(props)

      if (newProps) {
        res.status(200).json(newProps)
      } else {
        next(errorHandler(500, "Whoops!"))
        return
      }
    } catch (error) {
      next(error)
    }
  }
}
