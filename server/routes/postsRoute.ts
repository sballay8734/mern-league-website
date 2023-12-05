import express from "express"
import {
  proposal,
  voteOnProposal,
  commentOnProposal
} from "../controllers/postsController"
import { verifyUser } from "../utils/verifyUser"

const router = express.Router()

router.post("/proposals", proposal)
router.post("/proposals/:id", verifyUser, voteOnProposal)
router.post("/proposals/:id", verifyUser, commentOnProposal)
// router.post("/messageBoard", )

export default router
