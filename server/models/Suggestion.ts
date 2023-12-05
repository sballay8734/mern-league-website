/*
{
  "_id": "suggestion123",
  "userId": "userABC",
  "userName": "Don I",
  "title": "Bonus points for 3 TDs",
  "content": "I suggest implementing a bonus point system for touchdowns.",
  "status": "pending", // or "approved", "rejected", etc.
  "votes": {
    "upvotes": 5,
    "downvotes": 2
  },
  "comments": [
    {
      "userId": "userXYZ",
      "content": "I like this idea! It would add more excitement to the games."
    },
    {
      "userId": "user123",
      "content": "I disagree. I think the current scoring system is fine."
    }
  ],
  "upvoters": ["user1", "user4"],
  "downvoters": ["user8", "user2"],
  "timestamp": "2023-11-06T12:00:00Z"
}
*/
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
  voteInfo: { type: Object, default: { upVotes: 0, downVotes: 0 } },
  comments: { type: Array, default: [] },
  upVoters: { type: Array, default: [] },
  downVoters: { type: Array, default: [] }
})

const Proposal = mongoose.model("Proposal", proposalSchema)

export default Proposal
