// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { PlayModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: PlayModeType = {
  areRulesDisplayed: true,
  isStartTimerActive: true,
  isGamePaused: false,
  isMusicOn: true,
  isGameOver: false
}

// Actual Slice
export const playModeSlice = createSlice({
  name: 'playMode',
  initialState,
  reducers: {
    handleHideRules(state) {
      state.areRulesDisplayed = false
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
    handlePlayAgainWithoutRules(state) {
      state.areRulesDisplayed = false
      state.isStartTimerActive = true
      state.isGamePaused = false
      state.isGameOver = false
    },
    handleResetPlayModeSettings(state) {
      state.areRulesDisplayed = true
      state.isStartTimerActive = true
      state.isGamePaused = false
      state.isGameOver = false
    }
  }
})

export const {
  handleHideRules,
  handleTurnOffStartTimer,
  handleTurnMusicOn,
  handleTurnMusicOff,
  handleStopGame,
  handlePlayAgainWithoutRules,
  handleResetPlayModeSettings
} = playModeSlice.actions

export const selectPlayModeState = (state: AppState): PlayModeType => state.playMode

export default playModeSlice.reducer
