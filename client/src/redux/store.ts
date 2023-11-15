import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage/session"

import userReducer from "./user/userSlice"
import compareReducer from "./owners/compareSlice"
import { recordsApi } from "./records/recordsApi"
import { ownersApi } from "./owners/ownersApi"
import { authApi } from "./auth/authApi"
import { kingApi } from "./king/kingApi"

const rootReducer = combineReducers({
  user: userReducer,
  compare: compareReducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
  [ownersApi.reducerPath]: ownersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [kingApi.reducerPath]: kingApi.reducer
})

const persistConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER]
      }
    }).concat(
      recordsApi.middleware,
      ownersApi.middleware,
      authApi.middleware,
      kingApi.middleware
    )
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
