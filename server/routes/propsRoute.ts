import express from "express"

import { verifyUser } from "./../utils/verifyUser"
import { submitProp } from "../controllers/propsController"

const router = express.Router()

router.post("/:id", verifyUser, submitProp)

export default router
