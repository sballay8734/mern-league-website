import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface User {
  _id: string
  email: string
  firstName: string
  lastInitial: string
  avatar: string
  preferredTheme: string
  isAdmin: boolean
}

interface UserState {
  user: null | User
  error: null | string
}

const initialState: UserState = {
  user: null,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setOAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setUserTheme: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.preferredTheme = action.payload
      }
    },
    signOutUser: (state) => {
      state.user = null
    }
  }
})

export const { setUser, setOAuthError, setUserTheme, signOutUser } =
  userSlice.actions

export default userSlice.reducer
