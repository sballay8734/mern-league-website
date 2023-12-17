import mongoose, { Document, Schema } from "mongoose"

interface IPropSubmission extends Document {
  propID: number
  userID: string
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
  nflYear: number
  week: number
}

const propSubmissionSchema = new Schema({
  propID: { type: Number, required: true },
  userID: { type: String, required: true },
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
  result: { type: Schema.Types.Mixed, default: null },
  nflYear: { type: Number, required: true },
  week: { type: Number, required: true }
})

const PropSubmission = mongoose.model<IPropSubmission>(
  "PropSubmission",
  propSubmissionSchema
)

export default PropSubmission
