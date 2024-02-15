import mongoose, { Schema } from "mongoose"

export interface IChallenge {
  challengerId: string
  acceptorId: string
  challengerName: string
  acceptorName: string
  challengerSelection: string
  acceptorSelection: string
  wagerAmount: number
  gameId: string
  propId: string
  dateProposed: string
  dateAccepted: string
  type: string
  league: string
  gameStart: string
  result: string
  line: number
  propTitle: string
  homeData?: {
    homeLine: number
    homeTeam: string
    homePayout: number
    calcHomePayout: number
  } | null
  awayData?: {
    awayLine: number
    awayTeam: string
    awayPayout: number
    calcAwayPayout: number
  } | null
  overData?: {
    overLine: number
    overPayout: number
    calcOverPayout: number
  } | null
  underData?: {
    underLine: number
    underPayout: number
    calcUnderPayout: number
  } | null
  _id: string

  voided: boolean
}

const ChallengeSchema = new Schema({
  challengerId: String,
  acceptorId: { type: String, default: "" },
  challengerName: String,
  acceptorName: { type: String, default: "" },
  challengerSelection: String,
  acceptorSelection: String,
  wagerAmount: Number,
  gameId: String,
  propId: String,
  dateProposed: String,
  dateAccepted: String,
  type: String,
  league: String,
  gameStart: String,
  result: { type: String, default: "" },
  line: Number,
  propTitle: String,
  homeData: {
    homeLine: Number,
    homeTeam: String,
    homePayout: Number,
    calcHomePayout: Number
  },
  awayData: {
    awayLine: Number,
    awayTeam: String,
    awayPayout: Number,
    calcAwayPayout: Number
  },
  overData: {
    overLine: Number,
    overPayout: Number,
    calcOverPayout: Number
  },
  underData: {
    underLine: Number,
    underPayout: Number,
    calcUnderPayout: Number
  },

  voided: Boolean
})

const Challenge = mongoose.model<IChallenge>("challenge", ChallengeSchema)

export default Challenge
