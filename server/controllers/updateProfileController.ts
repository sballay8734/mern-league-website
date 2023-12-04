import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { errorHandler } from "../utils/error"
import User from "../models/User"

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"))
  }
  // if password exists, hash it
  let hashedPassword

  if (
    req.body.newPassword &&
    req.body.newPassword === req.body.confirmPassword
  ) {
    hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
  }

  // update the user
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        password: hashedPassword,
        avatar: req.body.avatar,
        preferredTheme: req.body.preferredTheme
      }
    },
    { new: true }
  )

  // send back user as response with password taken out
  if (updatedUser) {
    const userObject = updatedUser.toObject()
    const { password, ...rest } = userObject
    res.status(200).json(rest)
  }
}
