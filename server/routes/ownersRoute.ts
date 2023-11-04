import express from "express"
import { getOwners } from "../controllers/ownersController"

const router = express.Router()

router.get("/", getOwners)

export default router
