import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import {
  acceptChallenge,
  createChallenge,
  createProps,
  deleteExpiredUnacceptedChallenges,
  getChallenges,
  getChallengesByUser,
  getChallengesToUpdate,
  getProps,
  updateProp,
  withdrawChallenge
} from "../controllers/propsController"

const router = express.Router()

router.post("/create-props", verifyUser, createProps)
router.get("/get-props/:week/:year", getProps)
router.post("/update-prop", verifyUser, updateProp)
router.post("/accept-challenge", verifyUser, acceptChallenge)
router.post("/create-challenge", verifyUser, createChallenge)
router.get("/get-challenges/:gameId/:propId", getChallenges)
router.get("/get-challenges-to-update", getChallengesToUpdate)
router.get("/get-challenges/:userId", verifyUser, getChallengesByUser)
router.delete(
  "/delete-challenges",
  verifyUser,
  deleteExpiredUnacceptedChallenges
)
router.delete("/delete-challenge/:challengeId", verifyUser, withdrawChallenge)

export default router
