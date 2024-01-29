import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import { submitProp, createProps } from "../controllers/propsController"

const router = express.Router()

router.post("/create-props", verifyUser, createProps)
router.post("/:id", verifyUser, submitProp)

export default router
