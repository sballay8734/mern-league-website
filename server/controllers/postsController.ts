import { Request, Response, NextFunction } from "express"
import Proposal from "../models/Suggestion"
import User from "../models/User"
import { errorHandler } from "../utils/error"

export const createProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(errorHandler(400, "Unauthorized"))

  const userId = req.user.id
  const user = await User.findById(userId)

  if (user) {
    const userName = `${user.firstName} ${user.lastInitial}`
    const proposalData = {
      ...req.body,
      userId: userId,
      userName: userName,
      upVoters: [userId],
      seen: [userId]
    }
    try {
      const proposal = await Proposal.create(proposalData)
      if (proposal) {
        const proposalObject = proposal.toObject()
        res.status(200).json(proposalObject)
      } else {
        next(errorHandler(400, "Something went wrong"))
      }
    } catch (error) {
      next(error)
    }
  } else {
    next(errorHandler(500, "Something went wrong"))
  }
}

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

export const commentOnProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const proposalId = req.params.id
  const content = req.body.content
  const userId = req.user.id

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
    const user = await User.findById(userId)
    if (user) {
      const userObject = user.toObject()
      const userName = `${userObject.firstName} ${userObject.lastInitial}`

      proposal.set({
        comments: [...proposal.comments, { user: userName, comment: content }]
      })
    } else {
      next(errorHandler(400, "User not found"))
    }

    const updatedProposal = await proposal.save()

    if (updatedProposal) {
      const proposalObject = updatedProposal.toObject()
      res.status(200).json(proposalObject)
    } else {
      next(errorHandler(400, "Error updating proposal comments"))
    }
  } catch (error) {
    next(error)
  }
}

export const getProposals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proposals = await Proposal.find()
    const proposalObjects = proposals.map((item) => item.toObject())
    res.status(200).json(proposalObjects)
  } catch (error) {
    next(error)
  }
}

export const commishOverride = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(errorHandler(401, "Unauthorized"))
  const action = req.body.action

  if (action === "reject") {
    try {
      const proposalId = req.params.id
      const userId = req.user.id

      const proposal = await Proposal.findById(proposalId)
      const user = await User.findById(userId)

      if (!proposal || !user) return next(errorHandler(401, "Not found"))

      const userObject = user.toObject()

      if (userObject.isCommissioner === false) {
        return next(errorHandler(400, "Only the commissioner can do that!"))
      }

      proposal.set({ commishVeto: true, status: "rejected" })

      const updatedProposal = await proposal.save()

      if (updatedProposal) {
        const updatedProposalObject = updatedProposal.toObject()
        res.status(200).json(updatedProposalObject)
      } else {
        next(errorHandler(400, "Error updating proposal"))
      }
    } catch (error) {
      next(error)
    }
  } else if (action === "approve") {
    try {
      const proposalId = req.params.id
      const userId = req.user.id

      const proposal = await Proposal.findById(proposalId)
      const user = await User.findById(userId)

      if (!proposal || !user) return next(errorHandler(401, "Not found"))

      const userObject = user.toObject()

      if (userObject.isCommissioner === false) {
        return next(errorHandler(400, "Only the commissioner can do that!"))
      }

      proposal.set({ commishVeto: false, status: "approved" })

      const updatedProposal = await proposal.save()

      if (updatedProposal) {
        const updatedProposalObject = updatedProposal.toObject()
        res.status(200).json(updatedProposalObject)
      } else {
        next(errorHandler(400, "Error updating proposal"))
      }
    } catch (error) {
      next(error)
    }
  } else {
    next(errorHandler(500, "Something went wrong"))
  }
}

export const adminReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proposalId = req.params.id
    const user = await User.findById(req.user.id)

    if (!user || user.isAdmin === false) {
      return next(errorHandler(400, "Unauthorized"))
    }

    const proposal = await Proposal.findById(proposalId)

    if (!proposal) return next(errorHandler(400, "Proposal not found"))

    proposal.set({
      commishVeto: null,
      status: "pending"
    })

    const updatedProposal = await proposal.save()

    if (!updatedProposal)
      return next(errorHandler(400, "Error updating proposal"))

    const proposalObject = updatedProposal.toObject()
    res.status(200).json(proposalObject)
  } catch (error) {
    next(error)
  }
}

export const editProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id
    const proposalId = req.params.id
    const newTitle = req.body.title
    const newContent = req.body.content

    const proposal = await Proposal.findById(proposalId)

    if (!proposal) return next(errorHandler(400, "Proposal not found"))
    if (!req.user || userId !== proposal.userId)
      return next(
        errorHandler(400, "Only the creator of the proposal may update it")
      )

    proposal.set({
      title: newTitle,
      content: newContent,
      status: "pending",
      voteInfo: { upVotes: 1, downVotes: 0 },
      upVoters: [userId],
      downVoters: [],
      dateProposed: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
    })

    const updatedProposal = await proposal.save()

    if (!updatedProposal)
      return next(errorHandler(400, "Could not update proposal"))

    const proposalObject = updatedProposal.toObject()
    res.status(200).json(proposalObject)
  } catch (error) {
    next(error)
  }
}

// could also pass an action to this function to mark a proposal as "unread" as well.
export const markAsSeen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id
  const proposalId = req.params.proposalId

  console.log("ON SERVER...")

  const user = await User.findById(userId)
  if (!user)
    return res.status(403).json({ result: "fail", message: "User not found!" })

  const proposal = await Proposal.findById(proposalId)
  if (!proposal)
    return res
      .status(403)
      .json({ result: "fail", message: "Proposal not found!" })

  //TODO: Temporary fix (see ProposalWrapper)
  if (proposal.seen.includes(userId))
    return res.status(200).json({
      result: "temp",
      message: "User already maked as having seen this"
    })

  try {
    proposal.set({
      seen: [...proposal.seen, userId]
    })

    const newProposal = await proposal.save()
    if (!newProposal)
      return res
        .status(403)
        .json({ result: "fail", message: "Error updating proposal!" })

    return res.status(200).json({
      result: "success",
      message: 'Successfully marked proposal as "seen"!'
    })
  } catch (error) {
    next(error)
  }
}
