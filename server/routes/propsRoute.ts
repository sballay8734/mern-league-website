import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import {
  createProps,
  getProps,
  updateProp
} from "../controllers/propsController"

const router = express.Router()

router.post("/create-props", verifyUser, createProps)
router.get("/get-props/:week/:year", getProps)
router.post("/update-prop", verifyUser, updateProp)

export default router
