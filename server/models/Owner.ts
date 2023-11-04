import mongoose, { Document, Schema } from "mongoose"

// RoundObject interface
interface IRoundObject extends Document {
  participated: boolean
  pointsFor: number | null
  pointsAgainst: number | null
  opponent: string | null
}

// RegSznWeekObject interface
interface IRegSznWeekObject extends Document {
  pointsFor: number
  pointsAgainst: number
  opponent: string
}

// RegSznObject interface
interface IRegSznObject extends Document {
  weeks: Map<string, IRegSznWeekObject>
}

// PlayoffWeekObject interface, extending RoundObject interface
interface IPlayoffWeekObject extends Document {
  roundOne: IRoundOneObject
  rounds: Map<string, IRoundObject>
}

// Special case for the first round which may include a bye
interface IRoundOneObject extends IRoundObject {
  bye?: boolean
}

// YearObject interface
interface IYearObject extends Document {
  participated: boolean
  wins: number
  losses: number
  ties: number
  last: boolean
  finished: number
  regularSeason: IRegSznObject
  playoffs: IPlayoffWeekObject
}

// Owner interface
interface IOwner extends Document {
  ownerName: string
  id: number
  years: Map<number, IYearObject>
}

const RoundObjectSchema = new Schema({
  participated: { type: Boolean, required: true },
  pointsFor: { type: Number, default: null },
  pointsAgainst: { type: Number, default: null },
  opponent: { type: String, default: null }
})

const RoundOneObjectSchema = new Schema({
  bye: { type: Boolean, default: false }
}).add(RoundObjectSchema)

const PlayoffWeekObjectSchema = new Schema({
  roundOne: { type: RoundOneObjectSchema, required: true },
  rounds: { type: Map, of: RoundObjectSchema }
})

const RegSznWeekObjectSchema = new Schema({
  pointsFor: { type: Number, required: true },
  pointsAgainst: { type: Number, required: true },
  opponent: { type: String, required: true }
})

const RegSznObjectSchema = new Schema({
  // The weeks are dynamic
  weeks: { type: Map, of: RegSznWeekObjectSchema }
})

const YearObjectSchema = new Schema({
  participated: { type: Boolean, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  ties: { type: Number, required: true },
  last: { type: Boolean, required: true },
  finished: { type: Number, required: true },
  regularSeason: { type: RegSznObjectSchema, required: true },
  playoffs: { type: PlayoffWeekObjectSchema, required: true }
})

const ownerSchema = new Schema({
  ownerName: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  // The years are dynamic, key is year number, value follows YearObjectSchema
  years: { type: Map, of: YearObjectSchema }
})

const Owner = mongoose.model<IOwner>("Owner", ownerSchema)

export default Owner
