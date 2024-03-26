// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import AnimatedBoat from './Playboard/AnimatedBoat'
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
    <div className="relative responsive-canvas flex justify-center bg-white">
      <AnimatedBoat />
      {!isPlayMode && !isRankingMode && (
        <div className="absolute font1">
          <h1 className="text-2xl md:text-4xl lg:text-6xl text-center my-4 md:my-7 lg:my-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Welcome to<br></br>
            <span className="text-red-500">Sea Catch Adventure</span>
          </h1>
          <div className="flex flex-col justify-center items-center mt-10 md:m-0 gap-4 md:gap-6 lg:gap-8">
            <button
              className="p-1 md:p-2 pt-2 md:pt-4 w-[150px] md:w-[190px] lg:w-[220px] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={startGame}>
              Play
            </button>
            <button
              className="p-1 md:p-2 pt-2 md:pt-4 w-[150px] md:w-[190px] lg:w-[220px] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover whitespace-nowrap hover:scale-110"
              onClick={openRanking}>
              See ranking
            </button>
          </div>
        </div>
      )}
      {isPlayMode && <Playboard />}
      {isRankingMode && <Leaderboard />}
    </div>
  )
}

export default Game
