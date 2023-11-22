import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface User {
  _id: string
  email: string
  firstName?: string
  lastName?: string
  displayName: string
  avatar: string
  preferredTheme?: string
  isAdmin: boolean
}

interface UserState {
  user: null | User
}

const initialState: UserState = {
  user: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
