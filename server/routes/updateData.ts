import express from "express"
import { addYear, updateStatic } from "../controllers/staticDataController"
import { verifyAdmin } from "../utils/verifyAdmin"

const router = express.Router()

router.post("/static", verifyAdmin, updateStatic)
router.put("/static", verifyAdmin, addYear)

export default router
