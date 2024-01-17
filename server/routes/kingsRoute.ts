import express from "express"

import { updateData, getData } from "../controllers/kingController"
import { verifyAdmin } from "../utils/verifyAdmin"

const router = express.Router()

router.get("/data", getData)
router.post("/data", verifyAdmin, updateData)

export default router
