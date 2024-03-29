// REDUX TOOLKIT IMPORTS
import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'

// SLICES IMPORTS
import { apiSlice } from '../slices/apiSlice'
import { gameModeSlice } from '../slices/gameModeSlice'
import { playModeSlice } from '../slices/playModeSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [gameModeSlice.name]: gameModeSlice.reducer,
    [playModeSlice.name]: playModeSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export type { AppState, AppDispatch, AppThunk }
