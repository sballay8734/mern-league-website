import express from "express"
import { getRecords, updateRecord } from "../controllers/recordsController"

const router = express.Router()

router.get("/", getRecords)
router.put("/:id", updateRecord)

export default router
