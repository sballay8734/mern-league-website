import express from "express"
import {
  signup,
  signin,
  google,
  signout,
  reduceRequestTotal
} from "../controllers/authController"
import { verifyUser } from "../utils/verifyUser"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/signout", signout)
router.post("/reduce", verifyUser, reduceRequestTotal)

export default router
