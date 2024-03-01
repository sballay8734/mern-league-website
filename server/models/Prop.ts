import mongoose, { Schema } from "mongoose"

export interface PropToDbInterface {
  type: string
  league: string
  subType?: string
  player?: string
  gameId: string
  expiration: string
  uniqueId: string
  week: number
  year: number
  line: number
  _id: string

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

  voided: boolean
  guestCreated: boolean
}

const propSchema = new Schema({
  type: { type: String, required: true },
  league: String,
  subType: String,
  player: String,
  gameId: { type: String, required: true },
  expiration: { type: String, required: true },
  uniqueId: { type: String, required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },

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

  voided: { type: Boolean, required: true, default: false },

  weekYear: { type: String, index: true, required: true },
  guestCreated: { type: Boolean, default: false }
})

const Prop = mongoose.model<PropToDbInterface>("Prop", propSchema)

export default Prop
