import express from "express"
import {
  createProposal,
  voteOnProposal,
  commentOnProposal,
  getProposals
} from "../controllers/postsController"
import { verifyUser } from "../utils/verifyUser"

const router = express.Router()

router.get("/proposals", getProposals)
router.post("/proposals", verifyUser, createProposal)
router.post("/proposals/:id", verifyUser, voteOnProposal)
router.post("/proposals/:id/comment", verifyUser, commentOnProposal)
// router.post("/messageBoard", )

export default router
