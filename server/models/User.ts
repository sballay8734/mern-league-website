import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastInitial: string
  avatar: string
  preferredTheme: string
  isAdmin: boolean
  isCommissioner: boolean
  isTempAdmin: boolean
  fullName: string
  requestsRemaining: number
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastInitial: { type: String },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/mern-league-website.appspot.com/o/profileImg.png?alt=media&token=addf2c1d-6e3f-4ecd-bc7e-411f7c83088e"
  },
  preferredTheme: { type: String, default: "eagles" },
  isAdmin: { type: Boolean, default: false },
  isCommissioner: { type: Boolean, default: false },
  isTempAdmin: { type: Boolean, default: true },
  fullName: { type: String, default: "" },
  fetchCount: { type: Number, default: 0 },
  requestsRemaining: { type: Number }
})

const User = mongoose.model<IUser>("User", userSchema)

export default User
