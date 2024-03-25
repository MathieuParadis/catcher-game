// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import AnimatedMenu from './Playboard/AnimatedBoat'
import Playboard from './Playboard/Playboard'
import Leaderboard from './Leaderboard/Leaderboard'

// REDUX IMPORTS
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {
  selectGameModeState,
  handleStartGame,
  handleOpenRanking
} from '../redux/slices/gameModeSlice'

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const gameMode = useAppSelector(selectGameModeState)
  const { isPlayMode, isRankingMode } = gameMode

  const startGame = (): void => {
    dispatch(handleStartGame())
  }

  const openRanking = (): void => {
    dispatch(handleOpenRanking())
  }

  return (
    <div className="relative responsive-canvas flex justify-center items-center">
      <AnimatedMenu />
      <div className="absolute flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl text-center mb-10">
          Welcome to<br></br>
          <span className="font-bold">Sea Catch Adventure</span>
        </h1>
        <button className="p-2 w-[150px] border" onClick={startGame}>
          Play
        </button>
        <button className="p-2 w-[150px] border whitespace-nowrap" onClick={openRanking}>
          See ranking
        </button>
      </div>

      {isPlayMode && <Playboard />}
      {isRankingMode && <Leaderboard />}
    </div>
  )
}

export default Game
