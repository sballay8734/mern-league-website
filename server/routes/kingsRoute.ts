import express from "express"

import { results, standings } from "../controllers/kingController"

const router = express.Router()

router.get("/results", results)
router.get("/standings", standings)

export default router
