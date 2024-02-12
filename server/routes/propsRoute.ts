import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import {
  acceptChallenge,
  createChallenge,
  createProps,
  getChallenges,
  getProps,
  updateProp
} from "../controllers/propsController"

const router = express.Router()

router.post("/create-props", verifyUser, createProps)
router.get("/get-props/:week/:year", getProps)
router.post("/update-prop", verifyUser, updateProp)
router.post("/accept-challenge", verifyUser, acceptChallenge)
router.post("/create-challenge", verifyUser, createChallenge)
router.get("/get-challenges/:gameId/:propId", getChallenges)

export default router
