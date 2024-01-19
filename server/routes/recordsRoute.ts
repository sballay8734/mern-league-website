import express from "express"
import { getRecords, setRecords } from "../controllers/recordsController"
import { verifyAdmin } from "../utils/verifyAdmin"

const router = express.Router()

router.get("/", getRecords)
router.post("/", verifyAdmin, setRecords)

export default router
