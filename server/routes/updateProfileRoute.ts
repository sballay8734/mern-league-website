import express from "express"
import { updateProfile } from "../controllers/updateProfileController"
import { verifyUser } from "../utils/verifyUser"

const router = express.Router()

router.post("/update/:id", verifyUser, updateProfile)

export default router
