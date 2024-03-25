// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { GameModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: GameModeType = {
  isPlayMode: false,
  showRules: true,
  isRankingMode: false
}

// Actual Slice
export const gameModeSlice = createSlice({
  name: 'gameMode',
  initialState,
  reducers: {
    handleStartGame(state) {
      state.isPlayMode = true
      state.isRankingMode = false
    },
    handleHideRules(state) {
      state.showRules = false
    },
    handleOpenRanking(state) {
      state.isPlayMode = false
      state.isRankingMode = true
    },
    handleBackToMainMenu(state) {
      state.isPlayMode = false
      state.showRules = true
      state.isRankingMode = false
    }
  }
})

export const { handleStartGame, handleHideRules, handleOpenRanking, handleBackToMainMenu } =
  gameModeSlice.actions

export const selectGameModeState = (state: AppState): GameModeType => state.gameMode

export default gameModeSlice.reducer
