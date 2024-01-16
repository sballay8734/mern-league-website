import express from "express"

import { updateData } from "../controllers/kingController"
import { verifyAdmin } from "../utils/verifyAdmin"

const router = express.Router()

// router.get("/data", standings)
router.post("/data", verifyAdmin, updateData)

export default router
