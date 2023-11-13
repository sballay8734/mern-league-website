import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface User {
  email: string
  firstName: string
  lastName: string
  displayName: string
  isAdmin: boolean
}

interface UserState {
  user: null | User
  error: null | string
  loading: boolean
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
      state.loading = false
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, setUser } =
  userSlice.actions

export default userSlice.reducer
