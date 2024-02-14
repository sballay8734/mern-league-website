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
  result: string
  line: number
  propTitle: string // this is where you put player name or matchup
  homeData?: {
    homeTeam: string
    homePayout: number
    calcHomePayout: number
  } | null
  awayData?: {
    awayTeam: string
    awayPayout: number
    calcAwayPayout: number
  } | null
  overData?: {
    overPayout: number
    calcOverPayout: number
  } | null
  underData?: {
    underPayout: number
    calcUnderPayout: number
  } | null
  _id: string

  voided: boolean
}

const ChallengeSchema = new Schema({
  challengerId: String,
  acceptorId: String,
  challengerName: String,
  acceptorName: String,
  challengerSelection: String,
  acceptorSelection: String,
  wagerAmount: Number,
  gameId: String,
  propId: String,
  dateProposed: String,
  dateAccepted: String,
  type: String,
  result: { type: String, default: "" },
  line: Number,
  propTitle: String,
  homeData: {
    homeTeam: String,
    homePayout: Number,
    calcHomePayout: Number
  },
  awayData: {
    awayTeam: String,
    awayPayout: Number,
    calcAwayPayout: Number
  },
  overData: {
    overPayout: Number,
    calcOverPayout: Number
  },
  underData: {
    underPayout: Number,
    calcUnderPayout: Number
  },

  voided: Boolean
})

const Challenge = mongoose.model<IChallenge>("challenge", ChallengeSchema)

export default Challenge
