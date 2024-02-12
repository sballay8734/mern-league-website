import mongoose, { Schema } from "mongoose"

interface Challenge {
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
  result: string

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
  dateProposed: String,
  dateAccepted: String,
  result: { type: String, default: "" },

  voided: Boolean
})

const Challenge = mongoose.model<Challenge>("challenge", ChallengeSchema)

export default Challenge
