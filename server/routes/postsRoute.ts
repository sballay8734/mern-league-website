import express from "express"
import {
  createProposal,
  voteOnProposal,
  commentOnProposal,
  getProposals,
  commishOverride,
  adminReset,
  editProposal,
  markAsSeen
} from "../controllers/postsController"
import { verifyUser } from "../utils/verifyUser"

const router = express.Router()

router.get("/proposals", getProposals)
router.post("/proposals", verifyUser, createProposal)
router.post("/proposals/:id", verifyUser, voteOnProposal)
router.post("/proposals/:id/comment", verifyUser, commentOnProposal)
router.post("/proposals/:id/reject", verifyUser, commishOverride)
router.post("/proposals/:id/reset", verifyUser, adminReset)
router.patch("/proposals/:id", verifyUser, editProposal)
router.patch("/proposals/:proposalId/seen", verifyUser, markAsSeen)

export default router
