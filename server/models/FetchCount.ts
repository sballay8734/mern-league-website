import mongoose, { Schema } from "mongoose"

interface FetchCount {
  [userId: string]: number
}

const FetchCountSchema = new Schema<FetchCount>({
  userId: { type: Schema.Types.Mixed }
})

const FetchCount = mongoose.model("FetchCount", FetchCountSchema)

export default FetchCount
