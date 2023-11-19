import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
  email: string
  password: string
  firstName?: string
  lastName?: string
  displayName: string
  avatar: string
  preferredTheme: string
  isAdmin: boolean
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  displayName: { type: String, required: true, unique: true },
  // avatar: { type: String, default: "../../public/profileImg.png" },
  preferredTheme: { type: String, default: "eagles" },
  isAdmin: { type: Boolean, default: false }
})

const User = mongoose.model<IUser>("User", userSchema)

export default User
