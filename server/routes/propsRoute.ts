import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import {
  acceptChallenge,
  addChallenge,
  createProps,
  getProps,
  updateProp
} from "../controllers/propsController"

const router = express.Router()

router.post("/create-props", verifyUser, createProps)
router.get("/get-props/:week/:year", getProps)
router.post("/update-prop", verifyUser, updateProp)
router.post("/add-challenge", verifyUser, addChallenge)
router.post("/accept-challenge", acceptChallenge)

export default router
