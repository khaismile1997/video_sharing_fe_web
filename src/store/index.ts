import { configureStore } from '@reduxjs/toolkit'

import users from './users.controller'
import videos from './videos.controller'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
  reducer: {  users, videos },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store