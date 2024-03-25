// REDUX TOOLKIT IMPORTS
import { createSlice } from '@reduxjs/toolkit'

// STATE IMPORT
import type { AppState } from '../store/store'

// TYPES IMPORTS
import type { GameModeType } from '../../types/gameModeTypes'

// Initial state
const initialState: GameModeType = {
  isPlayMode: false,
  isRankingMode: false
}

// Actual Slice
export const gameModeSlice = createSlice({
  name: 'gameMode',
  initialState,
  reducers: {
    startGame(state) {
      state.isPlayMode = true
      state.isRankingMode = false
    },
    openRanking(state) {
      state.isPlayMode = false
      state.isRankingMode = true
    },
    backToMainMenu(state) {
      state.isPlayMode = false
      state.isRankingMode = false
    }
  }
})

export const { startGame, openRanking, backToMainMenu } = gameModeSlice.actions

export const selectGameModeState = (state: AppState): GameModeType => state.gameMode

export default gameModeSlice.reducer
