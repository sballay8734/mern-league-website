import mongoose, { Schema, Document } from "mongoose"

interface IRecord extends Document {
  name: string
  displayName: string
  description: string
  value: number | null
  holder: string | null
  year: number | null
  wasPlayoffs: boolean | null
}

const recordSchema = new Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  value: { type: Number },
  holder: { type: String },
  year: { type: Number },
  wasPlayoffs: { type: Boolean }
})

const Record = mongoose.model<IRecord>("Record", recordSchema)

export default Record
