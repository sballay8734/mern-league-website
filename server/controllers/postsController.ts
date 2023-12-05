import { Request, Response, NextFunction } from "express"
import Proposal from "../models/Suggestion"
import { errorHandler } from "../utils/error"

export const proposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proposal = await Proposal.create(req.body)
    if (proposal) {
      const proposalObject = proposal.toObject()
      res.status(200).json(proposalObject)
    } else {
      next(errorHandler(400, "Something went wrong"))
    }
  } catch (error) {
    next(error)
  }
}

// you could make a separate route to allow the creator to update the actual text and content. But for now, just stick with voting

// proposalId = 656f5932d2cf9d68ebe072cd
// userId = 656cda768f1c1f8685b2aa54
// action = "upvote"
export const voteOnProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id
    const proposalId = req.params.id

    const proposal = await Proposal.findById(proposalId)

    if (!proposal) {
      next(errorHandler(404, "Proposal not found"))
      return
    }

    // need to handle if they click upvote but they've already downvoted and vice versa
    if (req.body.action === "upvote") {
      if (proposal.upVoters.includes(userId))
        return next(errorHandler(400, "You already voted to approve"))
      if (proposal.downVoters.includes(userId)) {
        // remove userId from downvoters and decrement count
        const index = proposal.downVoters.indexOf(userId)
        proposal.downVoters.splice(index, 1)
        proposal.set({
          "voteInfo.downVotes": proposal.voteInfo.downVotes - 1,
          "voteInfo.upVotes": proposal.voteInfo.upVotes + 1,
          upVoters: [...proposal.upVoters, userId]
        })
      } else {
        proposal.set({
          "voteInfo.upVotes": proposal.voteInfo.upVotes + 1,
          upVoters: [...proposal.upVoters, userId]
        })
      }
    } else if (req.body.action === "downvote") {
      if (proposal.downVoters.includes(userId))
        return next(errorHandler(400, "You already voted to reject"))
      if (proposal.upVoters.includes(userId)) {
        // remove userId from upvoters and decrement count
        const index = proposal.upVoters.indexOf(userId)
        proposal.upVoters.splice(index, 1)
        proposal.set({
          "voteInfo.upVotes": proposal.voteInfo.upVotes - 1,
          "voteInfo.downVotes": proposal.voteInfo.downVotes + 1,
          downVoters: [...proposal.downVoters, userId]
        })
      } else {
        proposal.set({
          "voteInfo.downVotes": proposal.voteInfo.downVotes + 1,
          downVoters: [...proposal.downVoters, userId]
        })
      }
    } else {
      next(errorHandler(400, "Something went wrong"))
      return
    }

    const updatedProposal = await proposal.save()

    const proposalObject = updatedProposal.toObject()
    res.status(200).json(proposalObject)
  } catch (error) {
    next(error)
  }
}

// proposalId = 656f5932d2cf9d68ebe072cd
// userId = 656cda768f1c1f8685b2aa54
// content = "lakjsdflkajsdlkfjas"
export const commentOnProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const proposalId = req.params.id
  const content = req.body

  const proposal = await Proposal.findById(proposalId)

  if (!proposal) {
    next(errorHandler(400, "Proposal not found"))
    return
  }

  if (proposal.comments.length >= 10) {
    next(errorHandler(400, "There are too many comments on this post"))
    return
  }

  try {
    // try to add comment
  } catch (error) {
    // catch error
  }
}
