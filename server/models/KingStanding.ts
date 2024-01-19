import mongoose, { Schema, Document } from "mongoose"

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  weekEliminated: number | null
  weeklyScores: WeeklyScores
}

interface WeeklyScores {
  [week: string]: {
    points: number,
    strike: boolean
  }
}

interface FullObject {
  yearCompleted: boolean
  year: string
  standingsData: OwnerObject
}

const WeeklyScoresSchema = new Schema({
  points: {type: Number},
  strike: {type: Boolean}
})


const OwnerObjectSchema = new Schema({
  totalPointsFor: {type: Number},
  totalPointsAgainst: {type: Number},
  strikes: {type: Number},
  topScorer: {type: Number},
  weekEliminated: {type: Number},
  weeklyScores: {type: Map, of: WeeklyScoresSchema}
})

const FullKingObject = new Schema({
  yearCompleted: {type: Boolean, required: true},
  year: {type: String, required: true},
  standingsData: {type: Map, of: OwnerObjectSchema}
})

const King = mongoose.model<FullObject>(
  "Kings",
  FullKingObject
)

export default King
