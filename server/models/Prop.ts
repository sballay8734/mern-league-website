import mongoose, { Document, Schema } from "mongoose"

interface Prop extends Document {
  propID: number
  type: "ouPlayer" | "ouTeam" | "spread"
  team1?: string
  team2?: string
  player?: string
  stat?: string | null
  line: number
  favorite?: string
  nonFavorite?: string
  selectedOU?: null | "under" | "over"
  selectedTeam?: null | string
  startDate: string
  endDate: string
  result: number | string | null
}

const propSchema = new Schema({
  propID: { type: Number, required: true },
  type: {
    type: String,
    enum: ["ouPlayer", "ouTeam", "spread"],
    required: true
  },
  team1: { type: String },
  team2: { type: String },
  player: { type: String },
  stat: { type: String, default: null },
  line: { type: Number, required: true },
  favorite: { type: String },
  nonFavorite: { type: String },
  selectedOU: { type: String, enum: [null, "under", "over"], default: null },
  selectedTeam: { type: String, default: null },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  result: { type: Schema.Types.Mixed, default: null }
})

const PropModel = mongoose.model<Prop>("Prop", propSchema)

export default PropModel
