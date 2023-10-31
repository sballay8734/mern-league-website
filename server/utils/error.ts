import { Err } from "../types/errorTypes"

// UNDERSTAND THIS BEFORE MOVING ON
export const errorHandler = (statusCode: number, message: string): Err => {
  const error = new Error(message) as Err

  error.statusCode = statusCode
  error.message = message

  return error
}
