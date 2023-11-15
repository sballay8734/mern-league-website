import mongoose, { Schema, Document } from "mongoose"

interface ResultObject {
  ownerName: string
  points: number
}

interface IWeeklyResult extends Document {
  year: number
  week: number
  results: ResultObject[]
}

const resultObjectSchema = new Schema<ResultObject>({
  ownerName: { type: String, required: true },
  points: { type: Number, required: true }
})

const weeklyResultSchema = new Schema({
  year: { type: Number, required: true },
  week: { type: Number, required: true },
  results: { type: [resultObjectSchema], required: true }
})

const WeeklyResult = mongoose.model<IWeeklyResult>(
  "WeeklyResult",
  weeklyResultSchema
)

export default WeeklyResult

/*

{
  id: 1,
  year: 2014,
  week: 1,
  results: [
    { ownerName: "Steve Smith", points: 120 },
    { ownerName: "Bob Smith", points: 110 },
    { ownerName: "John Smith", points: 105 }

    ... other owners
  ]
}

*/
