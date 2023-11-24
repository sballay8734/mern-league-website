import express from "express"
import { getOwners, getUsers } from "../controllers/ownersController"

const router = express.Router()

router.get("/", getOwners)
router.get("/users", getUsers)

export default router
