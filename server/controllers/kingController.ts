import { NextFunction, Request, Response } from "express"
import King from "../models/KingStanding"
import { errorHandler } from "../utils/error"

// export const standings = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("Running Standings")
//   try {
//     const standings = await King.find()
//     res.status(200).json(standings)
//   } catch (error) {
//     console.log("ERROR GETTING STANDINGS")
//     next(error)
//   }
// }

export const updateData = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const data = req.body.data
  const updateObject = req.body

  if (!user || user.isAdmin === false) next(errorHandler(400, "Unauthorized"))

  try {
    const dataToUpdate = await King.find({year: updateObject.year})

    // if there is no data, just write to the db
    if (!dataToUpdate) {
      const newData = await King.create(data)
      if (!newData) return next(errorHandler(400, "Something went wrong"))

      return res.status(200).json(newData)
    }

    // if there is, delete it, then replace it
    const deleteData = await King.deleteOne({year: updateObject.year})
    if (deleteData) {
      const newData = await King.create(data)
      if (!newData) return next(errorHandler(400, "Something went wrong"))

      return res.status(200).json(newData)
    }
    return next(errorHandler(400, "Something went wrong"))

  } catch (error) {
    next(error)
  }
}
// need to add updateResults & updateStandings
