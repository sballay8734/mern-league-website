import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import userReducer from "./user/userSlice"
import { recordsApi } from "./records/recordsApi"
import { ownersApi } from "./owners/ownersApi"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [recordsApi.reducerPath]: recordsApi.reducer,
    [ownersApi.reducerPath]: ownersApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      recordsApi.middleware,
      ownersApi.middleware
    )
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
