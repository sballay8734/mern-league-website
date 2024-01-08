import { NextFunction, Request, Response } from "express"
import jwt, { VerifyErrors } from "jsonwebtoken"

import { errorHandler } from "./error"

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check for token
  const token = req.cookies.access_token

  if (!token) return next(errorHandler(401, "Unauthorized"))
  // verify user using jwt
  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, user: any) => {
      if (err) return next(errorHandler(403, "Forbidden"))

      req.user = user
      next()
    }
  )
}
