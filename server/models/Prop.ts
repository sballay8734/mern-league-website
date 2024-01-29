import mongoose, { Schema } from "mongoose"

interface Challenges {
  challenger: string
  acceptor: string | null
  challengerChoice: string // "over" | "under" | "away" | "home"
  acceptorChoice: string // "over" | "under" | "away" | "home"

  void: boolean
}

export interface PropToDbInterface {
  type: string
  subType?: string
  player?: string
  gameId: string
  expiration: string
  uniqueId: string
  week: number
  nflYear: number

  overData?: { overLine: number; overPayout: number; calcOverPayout: number }
  underData?: {
    underLine: number
    underPayout: number
    calcUnderPayout: number
  }
  overSelections?: string[]
  underSelections?: string[]

  homeTeam?: string
  awayTeam?: string

  homeData?: {
    homeTeam: string
    homeLine: number
    homePayout: number
    calcHomePayout: number
  }
  awayData?: {
    awayTeam: string
    awayLine: number
    awayPayout: number
    calcAwayPayout: number
  }
  homeLineSelections?: string[]
  awayLineSelections?: string[]

  awayScoreResult?: number
  homeScoreResult?: number

  result?: number

  void: boolean

  challenges: Challenges[] | []
}

const ChallengesSchema = new Schema({
  challenger: String,
  acceptor: String,
  challengerChoice: String, // "over" | "under" | "away" | "home"
  acceptorChoice: String, // "over" | "under" | "away" | "home"

  void: { type: Boolean, default: false }
})

const propSchema = new Schema({
  type: { type: String, required: true },
  subType: String,
  player: String,
  gameId: { type: String, required: true },
  expiration: { type: String, required: true },
  uniqueId: { type: String, required: true },
  week: { type: Number, required: true },
  nflYear: { type: Number, required: true },

  overData: { overLine: Number, overPayout: Number, calcOverPayout: Number },
  underData: {
    underLine: Number,
    underPayout: Number,
    calcUnderPayout: Number
  },

  overSelections: [String],
  underSelections: [String],
  homeTeam: String,
  awayTeam: String,
  homeData: {
    homeTeam: String,
    homeLine: Number,
    homePayout: Number,
    calcHomePayout: Number
  },
  awayData: {
    awayTeam: String,
    awayLine: Number,
    awayPayout: Number,
    calcAwayPayout: Number
  },
  homeLineSelections: [String],
  awayLineSelections: [String],

  awayScoreResult: Number,
  homeScoreResult: Number,

  result: Number,

  void: { type: Boolean, required: true },

  challenges: { type: [ChallengesSchema], default: [] },

  weekYear: { type: String, index: true, required: true }
})

const Prop = mongoose.model<PropToDbInterface>("Prop", propSchema)

export default Prop
