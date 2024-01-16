import mongoose, { Schema, Document } from "mongoose"

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
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
/*

{
  id: 1,
  year: 2014,
  standings: [
    { ownerName: "Steve Smith", strikes: 0, totalPF: 750 },
    { ownerName: "Bob Smith", strikes: 2, totalPF: 576 },
    { ownerName: "John Smith", strikes: 1, totalPF: 600 },
    
    ... other owners
  ]
}

*/
