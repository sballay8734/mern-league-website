import { Request, Response, NextFunction } from "express"

import User from "../models/User"
import ComputedOwners from "../models/staticOwnerData"
import { errorHandler } from "../utils/error"
import { staticOwnerSchema } from "../models/staticOwnerData"

export const updateStatic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const staticOwnerDataArray = req.body

  try {
    if (!req.user) return next(errorHandler(400, "Unauthorized"))

    const userId = req.user.id
    const user = await User.findById(userId)

    if (!user) return next(errorHandler(400, "User not found"))
    if (user.isAdmin === false) return next(errorHandler(400, "Unauthorized"))

    // delete old userData in StaticData
    await ComputedOwners.deleteMany({})

    // write new data to ComputedOwners
    console.log("staticDataArray", staticOwnerDataArray)
    const savedDataArray = await Promise.all(
      staticOwnerDataArray.map(
        async (staticOwnerData: typeof staticOwnerSchema) => {
          // just set the object here...
          const newData = new ComputedOwners(staticOwnerData)
          return newData.save()
        }
      )
    )

    res.status(200).json(savedDataArray)
  } catch (error) {
    console.error("ERROR in updateStatic", error)
    next(error)
  }
}
