import { Request, Response, NextFunction } from "express"

import { errorHandler } from "../utils/error"
import PropSubmission from "../models/PropSubmission"
import Prop, { PropToDbInterface } from "../models/Prop"

interface WeekToNum {
  [week: string]: number
}

const weekToNumConversion: WeekToNum = {
  // Tuesday Morning (12:00am) ---> Monday Night (11:59pm)
  weekOne: 1,
  weekTwo: 2,
  weekThree: 3,
  weekFour: 4,
  weekFive: 5,
  weekSix: 6,
  weekSeven: 7,
  weekEight: 8,
  weekNine: 9,
  weekTen: 10,
  weekEleven: 11,
  weekTwelve: 12,
  weekThirteen: 13,
  weekFourteen: 14,
  weekFifteen: 15,
  weekSixteen: 16,
  weekSeventeen: 17,
  weekEighteen: 18,
  weekNineteen: 19,
  weekTwenty: 20,
  weekTwentyOne: 21,
  weekTwentyTwo: 22,
  weekTwentyThree: 23,
  testWeek: 53
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

export const updateProp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const action = req.body.action
  const prop: PropToDbInterface = req.body.prop
  const user = req.user

  console.log(prop, action)

  if (!user) return next(errorHandler(400, "Unauthorized"))

  const propExists = await Prop.findOne({
    gameId: prop.gameId,
    uniqueId: prop.uniqueId
  })

  if (!propExists) return next(errorHandler(500, "Could not find prop"))

  const updatedProp = propExists.toObject()

  try {
    if (prop.type === "playerProp") {
      res.status(200).json({ message: "Found Player Prop", action })
    } else if (prop.type === "teamTotals") {
      res.status(200).json({ message: "Found Team Total Prop", action })
    } else if (prop.type === "teamSpreads") {
      res.status(200).json({ message: "Found Team Spread Prop", action })
    } else {
      console.log("ERROR")
    }
  } catch (error) {
    next(error)
  }
}

export const getProps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const week = req.params.week
  const year = req.params.year

  console.log(weekToNumConversion[week], Number(year))

  // add validation here

  try {
    const propsForThisWeek = await Prop.find({
      week: weekToNumConversion[week],
      nflYear: Number(year)
    })

    // this needs to handle what happens if people visit the page when props havne't been submitted yet.
    if (!propsForThisWeek || propsForThisWeek.length === 0) {
      res.status(500).json("No props found for this week")
      return
    }

    res.status(200).json(propsForThisWeek)
  } catch (error) {
    next(error)
  }
}
