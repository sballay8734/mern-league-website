import express from "express"
import {
  getOwners,
  getStaticData,
  getUsers
} from "../controllers/ownersController"

const router = express.Router()

router.get("/", getOwners)
router.get("/users", getUsers)
router.get("/static", getStaticData)

export default router
