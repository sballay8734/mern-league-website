import mongoose, { Schema, Document } from "mongoose"

interface StandingObject {
  ownerName: string
  strikes: number
  totalPF: number
}

interface IKothStanding extends Document {
  year: number
  standings: StandingObject[]
}

const standingObjectSchema = new Schema({
  ownerName: { type: String, required: true },
  strikes: { type: Number, required: true },
  totalPF: { type: Number, required: true }
})

const kothStandingSchema = new Schema({
  year: { type: Number, required: true },
  standings: { type: [standingObjectSchema], required: true }
})

const KingStanding = mongoose.model<IKothStanding>(
  "KingStanding",
  kothStandingSchema
)

export default KingStanding
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
