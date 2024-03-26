// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { PlayModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: PlayModeType = {
  isDisplayRules: true,
  isStartTimerActive: true,
  isMusicOn: true,
  isGameOver: false
}

// Actual Slice
export const playModeSlice = createSlice({
  name: 'playMode',
  initialState,
  reducers: {
    handleHideRules(state) {
      state.isDisplayRules = false
    },
    handleTurnOffStartTimer(state) {
      state.isStartTimerActive = false
    },
    handleStopGame(state) {
      state.isGameOver = true
    },
    handleTurnMusicOn(state) {
      state.isMusicOn = true
    },
    handleTurnMusicOff(state) {
      state.isMusicOn = false
    },
    handleResetPlayModeSettings(state) {
      state = initialState
    }
  }
})

export const {
  handleHideRules,
  handleTurnOffStartTimer,
  handleTurnMusicOn,
  handleTurnMusicOff,
  handleStopGame,
  handleResetPlayModeSettings
} = playModeSlice.actions

export const selectPlayModeState = (state: AppState): PlayModeType => state.playMode

export default playModeSlice.reducer
