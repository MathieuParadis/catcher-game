// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { PlayModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: PlayModeType = {
  showRules: true,
  isStartTimerActive: true,
  isGameOver: false
}

// Actual Slice
export const playModeSlice = createSlice({
  name: 'playMode',
  initialState,
  reducers: {
    handleShowRules(state) {
      state.showRules = true
    },
    handleHideRules(state) {
      state.showRules = false
    }
  }
})

export const { handleShowRules, handleHideRules } = playModeSlice.actions

export const selectPlayModeState = (state: AppState): PlayModeType => state.playMode

export default playModeSlice.reducer
