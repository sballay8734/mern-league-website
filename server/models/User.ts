import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  displayName: string
  isAdmin: boolean
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  displayName: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false }
})

const User = mongoose.model<IUser>("User", userSchema)

export default User
