import { Request, Response, NextFunction } from "express"

import User from "../models/User"
import Owner from "../models/Owner"
import ComputedOwners from "../models/staticOwnerData"
import { errorHandler } from "../utils/error"
import { staticOwnerSchema } from "../models/staticOwnerData"
import { IYearObject } from "../models/Owner"

interface yearUpdateObject {
  ownerName: string,
  year: IYearObject
}



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
    next(error)
  }
}

export const addYear = async (req: Request, res: Response, next: NextFunction) => {
  const data: yearUpdateObject[] = req.body

  if (!data) return next(errorHandler(500, "No Data"))

  try {
    for (let i = 0; i < data.length; i++) {
      const currentOwner = data[i]
      const year = Object.keys(currentOwner)[0] as keyof yearUpdateObject
      const newData = currentOwner[year]

      console.log(newData) // Logging correctly

      const ownerToFind = await Owner.find({ownerName: currentOwner.ownerName}).lean()

      const updatedOwner = {
        ...ownerToFind, // something is wrong here
        [year]: newData
      }

      /* 
        for some reason the structure of updatedOwner looks like this:

        {
          "0": {
            "2014": {data},
            "2015": {data},
            "2016": {data},
            "2017": {data},
            "2018": {data},
            "2019": {data},
            ....
          }, 
          "2023": {data}
        }
      */

      console.log(ownerToFind)
    }
  } catch (error) {
    next(error)
  }
}

/* 
{
  ownerName: "John Smith",
  "2023": {data}
}
*/

// During season you'll want a function to add weekly matchup also