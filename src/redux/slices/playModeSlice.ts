// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { PlayModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: PlayModeType = {
  areRulesDisplayed: true,
  isStartResumeTimerActive: true,
  isGameInProgress: false,
  isGamePaused: false,
  isGameOver: false,
  isMusicOn: true
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
      state.isStartResumeTimerActive = false
    },
    handleSetGameInProgress(state) {
      state.isGameInProgress = true
    },
    handlePauseGame(state) {
      state.isGamePaused = true
    },
    handleResumeGame(state) {
      state.isGamePaused = false
      state.isStartResumeTimerActive = true
    },
    handleStopGame(state) {
      state.isGameInProgress = false
      state.isGameOver = true
    },
    handleTurnMusicOn(state) {
      state.isMusicOn = true
    },
    handleTurnMusicOff(state) {
      state.isMusicOn = false
    },
    handlePlayAgainWithRules(state) {
      state.areRulesDisplayed = true
      state.isStartResumeTimerActive = true
      state.isGameInProgress = false
      state.isGamePaused = false
      state.isGameOver = false
    },
    handlePlayAgainWithoutRules(state) {
      state.areRulesDisplayed = false
      state.isStartResumeTimerActive = true
      state.isGameInProgress = false
      state.isGamePaused = false
      state.isGameOver = false
    },
    handleResetPlayModeSettings(state) {
      state.areRulesDisplayed = true
      state.isStartResumeTimerActive = true
      state.isGameInProgress = false
      state.isGamePaused = false
      state.isGameOver = false
    }
  }
})

export const {
  handleHideRules,
  handleTurnOffStartTimer,
  handleSetGameInProgress,
  handlePauseGame,
  handleResumeGame,
  handleTurnMusicOn,
  handleTurnMusicOff,
  handleStopGame,
  handlePlayAgainWithRules,
  handlePlayAgainWithoutRules,
  handleResetPlayModeSettings
} = playModeSlice.actions

export const selectPlayModeState = (state: AppState): PlayModeType => state.playMode

export default playModeSlice.reducer
