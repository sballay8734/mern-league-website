import express from "express"
import { updateStatic } from "../controllers/staticDataController"
import { verifyAdmin } from "../utils/verifyAdmin"

const router = express.Router()

router.post("/static", verifyAdmin, updateStatic)

export default router
