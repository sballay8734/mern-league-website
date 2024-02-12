import { Request, Response, NextFunction } from "express"

import { errorHandler } from "../utils/error"
import Prop, { PropToDbInterface } from "../models/Prop"
import User from "../models/User"
import Challenge from "../models/Challenge"

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
    res.status(400).json("Props have already been set for this week")
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
  const userId = req.user.id

  // get users name
  const currentUser = await User.findById(userId)
  if (!currentUser) return next(errorHandler(400, "Unauthorized"))
  const userObject = currentUser.toObject()
  const userName = userObject.fullName

  // get prop
  const propExists = await Prop.findOne({
    gameId: prop.gameId,
    uniqueId: prop.uniqueId
  })
  if (!propExists) return next(errorHandler(400, "Could not find prop"))

  try {
    if (prop.type === "playerProp" || prop.type === "teamTotals") {
      if (action === "under") {
        // Might need to reword the line below
        if (!propExists.underSelections || !propExists.overSelections) {
          return res.status(400).json("One of them doesn't exist!")
        }

        if (propExists.underSelections?.includes(userName)) {
          return res.status(400).json("You already voted the under!")
        }

        if (propExists.overSelections?.includes(userName)) {
          // remove from overSelections and add to underSelections
          const index = propExists.overSelections.indexOf(userName)
          propExists.overSelections.splice(index, 1)

          if (!propExists.underSelections) return next(errorHandler(400, "NUS"))

          propExists.set({
            underSelections: [...propExists.underSelections, userName]
          })
          propExists.save()
          return res.status(200).json("You have been SWITCHED to the under!")
        }

        propExists.set({
          underSelections: [...propExists.underSelections, userName]
        })
        propExists.save()

        return res.status(200).json("You have been ADDED to under!")
      } else if (action === "over") {
        if (!propExists.underSelections || !propExists.overSelections) {
          return res.status(400).json("One of them doesn't exist!")
        }

        if (propExists.overSelections?.includes(userName)) {
          return res.status(400).json("You already voted the over!")
        }
        if (propExists.underSelections?.includes(userName)) {
          // remove from underSelections and add to overSelections
          const index = propExists.underSelections.indexOf(userName)
          propExists.underSelections.splice(index, 1)

          if (!propExists.overSelections) return next(errorHandler(400, "NUS"))

          propExists.set({
            overSelections: [...propExists.overSelections, userName]
          })
          propExists.save()
          return res.status(200).json("You have been SWITCHED to the over!")
          //
        }
        propExists.set({
          overSelections: [...propExists.overSelections, userName]
        })
        propExists.save()
        res.status(200).json("You have been ADDED to the over!")
      }
    } else if (prop.type === "teamSpreads") {
      if (!propExists.homeLineSelections || !propExists.awayLineSelections) {
        return res.status(400).json("One of them doesn't exist!")
      }

      if (action === prop.homeData?.homeTeam) {
        // if they voted for home, but were already in the home list
        if (propExists.homeLineSelections?.includes(userName)) {
          return res.status(400).json("You already bet on the HomeTeam!")
        }
        // if they voted for home but were in the away list
        if (propExists.awayLineSelections.includes(userName)) {
          // remove them from the away list
          const index = propExists.awayLineSelections.indexOf(userName)
          propExists.awayLineSelections.splice(index, 1)

          if (!propExists.awayLineSelections)
            return next(errorHandler(400, "NUS"))

          // add them to the home list
          propExists.set({
            homeLineSelections: [...propExists.homeLineSelections, userName]
          })
          propExists.save()
          return res.status(200).json("You have been SWITCHED to the HomeTeam!")
        }
        // add if name wasn't found in either list
        propExists.set({
          homeLineSelections: [...propExists.homeLineSelections, userName]
        })
        propExists.save()
        return res.status(200).json("You have been ADDED to the AwayTeam!")
      } else if (action === prop.awayData?.awayTeam) {
        // if they voted for away, but were already in the away list
        if (propExists.awayLineSelections?.includes(userName)) {
          return res.status(400).json("You already bet on the AwayTeam!")
        }

        if (propExists.homeLineSelections.includes(userName)) {
          const index = propExists.homeLineSelections.indexOf(userName)
          propExists.homeLineSelections.splice(index, 1)

          if (!propExists.homeLineSelections)
            return next(errorHandler(400, "NUS"))

          propExists.set({
            awayLineSelections: [...propExists.awayLineSelections, userName]
          })
          propExists.save()
          return res.status(200).json("You have been SWITCHED to the AwayTeam!")
        }

        propExists.set({
          awayLineSelections: [...propExists.awayLineSelections, userName]
        })
        propExists.save()
        return res.status(200).json("You have been ADDED to the AwayTeam!")
      }
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

  // add validation here

  try {
    const propsForThisWeek = await Prop.find({
      week: weekToNumConversion[week],
      nflYear: Number(year)
    })

    // this needs to handle what happens if people visit the page when props havne't been submitted yet or if they have expired
    if (!propsForThisWeek || propsForThisWeek.length === 0) {
      res.status(404).json("No props found for this week")
      console.log("NO PROPS FOUND!")
      return
    }

    res.status(200).json(propsForThisWeek)
  } catch (error) {
    next(error)
  }
}

interface IChallenge {
  challengerName: string
  acceptorName: string
  challengerSelection: string // "over" | "under" | "away" | "home"
  acceptorSelection: string // "over" | "under" | "away" | "home"
  wagerAmount: number
  _id: string

  void: boolean
}

export const createChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(errorHandler(400, "Unauthorized"))

  const challengerId: string = req.user.id
  const gameId: string = req.body.gameId
  const propId: string = req.body.uniqueId
  const challenge: IChallenge = req.body.challenge

  const formattedChallenge = {
    challengerId: challengerId,
    acceptorId: "",
    challengerName: challenge.challengerName,
    acceptorName: "",
    challengerSelection: challenge.challengerSelection,
    acceptorSelection: challenge.acceptorSelection,
    wagerAmount: challenge.wagerAmount,
    gameId: gameId,
    propId: propId,
    dateProposed: new Date().toISOString(),
    dateAccepted: "",
    voided: false
  }

  try {
    // try to create the challenge
    const newChallenge = await Challenge.create(formattedChallenge)

    if (newChallenge) {
      return res.status(200).json(newChallenge)
    }

    return next(errorHandler(500, "Could not create challenge"))
  } catch (error) {
    next(error)
  }
}

export const getChallenges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId: string = req.params.gameId
  const propId: string = req.params.propId

  const challenges = await Challenge.find({ gameId: gameId, propId: propId })

  if (challenges) return res.status(200).json(challenges)

  return
}

export const getChallengesToUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const challenges = await Challenge.find({ result: "" })

  if (challenges) return res.status(200).json(challenges)

  return
}

export const acceptChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const acceptorId = req.user.id
  const acceptorName = req.body.acceptorName
  const challengeId = req.body.challengeId
  const challengerName = req.body.challengerName
  const dateAccepted = new Date().toISOString()

  if (acceptorName === challengerName)
    return next(errorHandler(400, "You cannot accept your own challenge!"))

  try {
    const challengeToUpdate = await Challenge.findById(challengeId)

    if (!challengeToUpdate) return next(errorHandler(404, "Prop not found!"))
    if (challengeToUpdate.acceptorName !== "")
      return next(errorHandler(400, "Someone already accepted this!"))

    // Update the acceptorName if the challengeIndex is valid
    challengeToUpdate.acceptorName = acceptorName
    challengeToUpdate.acceptorId = acceptorId
    challengeToUpdate.dateAccepted = dateAccepted

    // Save the updated document
    const updatedChallenge = await challengeToUpdate.save()

    return res.status(200).json(updatedChallenge)
  } catch (error) {
    next(error)
  }
}
