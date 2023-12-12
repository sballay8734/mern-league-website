import mongoose, { Document } from "mongoose"

type ProposalStatus = "approved" | "rejected" | "pending"

interface Comment {
  userId: string
  content: string
}

interface VoteInfo {
  upVotes: number
  downVotes: number
}

interface IProposal extends Document {
  userId: string
  userName: string
  title: string
  content: string
  status: ProposalStatus
  voteInfo: VoteInfo
  comments: Comment[]
  upVoters: string[]
  downVoters: string[]
  yearProposed: number
  dateProposed: Date
  commishVeto: boolean
}

const proposalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending"
  },
  voteInfo: { type: Object, default: { upVotes: 1, downVotes: 0 } },
  comments: { type: Array, default: [] },
  upVoters: { type: Array, default: [] },
  downVoters: { type: Array, default: [] },
  yearProposed: { type: Number, default: new Date().getFullYear() },
  dateProposed: {
    type: String,
    default: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  },
  commishVeto: { type: Boolean, default: false }
})

const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema)

export default Proposal
