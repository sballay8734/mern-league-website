import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import userReducer from "./user/userSlice"
import { recordsApi } from "./records/recordsApi"
import { ownersApi } from "./owners/ownersApi"
import { authApi } from "./auth/authApi"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [recordsApi.reducerPath]: recordsApi.reducer,
    [ownersApi.reducerPath]: ownersApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      recordsApi.middleware,
      ownersApi.middleware,
      authApi.middleware
    )
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
