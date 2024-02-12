import mongoose, { Schema } from "mongoose"

export interface IChallenge {
  challengerId: string
  acceptorId: string
  challengerName: string
  acceptorName: string
  challengerSelection: string // "over" | "under" | "away" | "home"
  acceptorSelection: string // "over" | "under" | "away" | "home"
  wagerAmount: number
  gameId: string
  propId: string
  dateProposed: string
  dateAccepted: string
  type: string
  result: string
  _id: string

  voided: boolean
}

const ChallengeSchema = new Schema({
  challengerId: String,
  acceptorId: String,
  challengerName: String,
  acceptorName: String,
  challengerSelection: String,
  acceptorSelection: String,
  wagerAmount: Number,
  gameId: String,
  propId: String,
  type: String,
  dateProposed: String,
  dateAccepted: String,
  result: { type: String, default: "" },

  voided: Boolean
})

const Challenge = mongoose.model<IChallenge>("challenge", ChallengeSchema)

export default Challenge
