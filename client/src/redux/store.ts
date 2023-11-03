import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import userReducer from "./user/userSlice"
// import recordsReducer from "./records/recordsSlice"
import { recordsApi } from "./records/recordsApi"

export const store = configureStore({
  reducer: {
    user: userReducer,
    // records: recordsReducer,
    [recordsApi.reducerPath]: recordsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(recordsApi.middleware)
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
